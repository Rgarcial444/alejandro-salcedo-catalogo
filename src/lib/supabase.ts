import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uhkuxseyfyfiyeiwivnk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa3V4c2V5ZnlmaXllaXdpdm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzQwMDIsImV4cCI6MjA5MjQ1MDAwMn0.zrdedPyRkrBCSAHtiPykfQT-omvR7UZFDF4gEm-KFpo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: "as-supabase-auth",
    storage: {
      getItem: (key: string) => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(key);
      },
      setItem: (key: string, value: string) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, value);
      },
      removeItem: (key: string) => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(key);
      },
    },
  },
});

export const ALLOWED_EMAILS = ["salcedoalejandro058@gmail.com", "rgarcialimon@gmail.com"];
