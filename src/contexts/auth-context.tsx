import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, ALLOWED_EMAILS } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isAllowed: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string): Promise<{ error: string | null }> => {
    const normalizedEmail = email.toLowerCase().trim();
    
    const isEmailAllowed = ALLOWED_EMAILS.some(
      allowed => allowed.toLowerCase() === normalizedEmail
    );
    
    if (!isEmailAllowed) {
      return { error: "Correo no autorizado" };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: window.location.origin + "/admin",
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const userEmail = user?.email?.toLowerCase() ?? "";
  const isAllowed = ALLOWED_EMAILS.some(email => email.toLowerCase() === userEmail);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAllowed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}