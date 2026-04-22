import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, ALLOWED_EMAIL } from "@/lib/supabase";
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
    
    if (normalizedEmail !== ALLOWED_EMAIL.toLowerCase()) {
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

  const isAllowed = user?.email?.toLowerCase() === ALLOWED_EMAIL.toLowerCase() ?? false;

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