"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
// Import your helper functions

interface AuthProps {
  user: User | null;
  session: Session | null;
  signUp: (args: { 
    name: string; 
    email: string; 
    phonenumber: string; 
    password: string; 
    address: string; 
  }) => Promise<{ user: User | null; session: Session | null }>;
  
  signIn: (args: { 
    email: string; 
    password: string; 
  }) => Promise<{ user: User | null; session: Session | null }>;

  signOut: () => Promise<void>;
}


const Context = createContext<AuthProps | undefined>(undefined);

const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const session = await supabase.auth.getSession();
      console.log(session)
      const sessionUser = session?.data?.session?.user;
      console.log("user",sessionUser?.id)
      if (sessionUser) {
        const { data: profile } = await supabase.from("users").select("*").eq("userid", sessionUser?.id);
        setUser(profile?.[0] );
      }
    };
    getProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
  setSession(newSession ?? null);

  if (newSession?.user) {
    // Fetch extra user profile details from your DB
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("userid", newSession.user.id)
      .single();

    if (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
    } else {
      console.log(profile.name)
      setUser(profile);
    }
  } else {
    setUser(null);
  }
});

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Use your helper functions here inside signUp, signIn, and signOut

  const signUp = async({name,email,phonenumber,password,address}:{name:string,email:string,phonenumber:string,password:string,address:string})=>{
  try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      console.log(data)
      if (error) throw error;
      const hashed = await bcrypt.hash(password,8)
      const {error:insertError} = await supabase.from("users").insert([
          {
              userid:data?.user?.id,
              name,
              email,
              phonenumber,
              password:hashed,
              address,
          }
      ]);
      if(insertError) throw insertError;
      // Update session & user after signup
      const sessionData = await supabase.auth.getSession();
      setSession(sessionData.data.session ?? null);
      setUser(sessionData.data.session?.user ?? null);
      console.log(data);
      return data;
  } catch (err) {
      console.error('Sign Up failed:', err);
      throw err;
  }
}

const signIn = async({email,password}:{email:string,password:string})=>{
  try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Update session & user after signin
      const sessionData = await supabase.auth.getSession();
      setSession(sessionData.data.session ?? null);
      setUser(sessionData?.data?.session?.user ?? null);
      console.log(sessionData)
      return data;
  } catch (err) {
      console.error('Sign In failed:', err);
      throw err;
  }
}


  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Sign Out failed:", error);
      throw error;
    }
  };

  const exposed = { user, session, signUp, signIn, signOut };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default Provider;
