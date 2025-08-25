"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Session, User, createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Lazy-load Supabase client inside a function
const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
};

interface AuthProps {
  user: User | null;
  session: Session | null;
  signUp: (args: { name: string; email: string; phonenumber: string; password: string; address: string }) => Promise<{ user: User | null; session: Session | null }>;
  signIn: (args: { email: string; password: string }) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = getSupabaseClient();

  // Get session and profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession ?? null);

      if (currentSession?.user) {
        const { data: profile } = await supabase.from("users").select("*").eq("userid", currentSession.user.id).single();
        setUser(profile ?? null);
      }
    };

    fetchProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession ?? null);

      if (newSession?.user) {
        const { data: profile, error } = await supabase.from("users").select("*").eq("userid", newSession.user.id).single();
        if (error) setUser(null);
        else setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  // Signup
  const signUp = async ({ name, email, phonenumber, password, address }: { name: string; email: string; phonenumber: string; password: string; address: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const hashed = await bcrypt.hash(password, 8);
    const { error: insertError } = await supabase.from("users").insert([{
      userid: data.user?.id,
      name,
      email,
      phonenumber,
      password: hashed,
      address,
    }]);
    if (insertError) throw insertError;

    const { data: { session: newSession } } = await supabase.auth.getSession();
    setSession(newSession ?? null);
    setUser(newSession?.user ?? null);

    return data;
  };

  // Signin
  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: { session: newSession } } = await supabase.auth.getSession();
    setSession(newSession ?? null);
    setUser(newSession?.user ?? null);

    return data;
  };

  // Signout
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, session, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
