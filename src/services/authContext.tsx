"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase"; // ✅ your Supabase client

// Match your "users" table
interface UserProfile {
  userid: string;
  name: string;
  email: string;
  phonenumber: string;
  address: string;
  createdat: string; // ISO date string
}

interface AuthProps {
  user: UserProfile | null;
  session: Session | null;
  signUp: (args: { name: string; email: string; phonenumber: string; password: string; address: string }) 
    => Promise<{ user: UserProfile | null; session: Session | null }>;
  signIn: (args: { email: string; password: string }) 
    => Promise<{ user: UserProfile | null; session: Session | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const supabaseClient = supabase;

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session: currentSession } } = await supabaseClient.auth.getSession();
      setSession(currentSession ?? null);

      if (currentSession?.user) {
        const { data: profile } = await supabaseClient
          .from("users")
          .select("*")
          .eq("userid", currentSession.user.id)
          .single();
        setUser(profile ?? null);
      }
    };

    fetchProfile();

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession ?? null);

        if (newSession?.user) {
          const { data: profile, error } = await supabaseClient
            .from("users")
            .select("*")
            .eq("userid", newSession.user.id)
            .single();
          if (error) setUser(null);
          else setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabaseClient]);

  const signUp = async ({
    name,
    email,
    phonenumber,
    password,
    address,
  }: {
    name: string;
    email: string;
    phonenumber: string;
    password: string;
    address: string;
  }) => {
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) throw error;

    const hashed = await bcrypt.hash(password, 8);

    const { error: insertError } = await supabaseClient.from("users").insert([
      {
        userid: data.user?.id,
        name,
        email,
        phonenumber,
        password: hashed, // ⚠️ Ideally remove this column from DB
        address,
      },
    ]);
    if (insertError) throw insertError;

    const { data: { session: newSession } } = await supabaseClient.auth.getSession();
    setSession(newSession ?? null);

    const { data: profile } = await supabaseClient
      .from("users")
      .select("*")
      .eq("userid", data.user?.id)
      .single();

    setUser(profile ?? null);

    return { user: profile ?? null, session: newSession ?? null };
  };

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: { session: newSession } } = await supabaseClient.auth.getSession();
    setSession(newSession ?? null);

    const { data: profile } = await supabaseClient
      .from("users")
      .select("*")
      .eq("userid", data.user?.id)
      .single();

    setUser(profile ?? null);

    return { user: profile ?? null, session: newSession ?? null };
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
