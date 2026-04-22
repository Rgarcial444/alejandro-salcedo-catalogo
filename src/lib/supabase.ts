import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uhkuxseyfyfiyeiwivnk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa3V4c2V5ZnlmaXllaXdpdm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzQwMDIsImV4cCI6MjA5MjQ1MDAwMn0.zrdedPyRkrBCSAHtiPykfQT-omvR7UZFDF4gEm-KFpo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
