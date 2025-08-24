// import { supabase } from "@/lib/supabase";

// export async function signUp({email,password}:{email:string,password:string}){
//     try {
//         const {data, error} = await supabase.auth.signUp({email,password})
//         if (error) throw error;
//         console.log(data)
//         return data;
//     } catch (err) {
//         console.log('Sign Up failed:',err)
//     }
// }

// export async function signIn({email,password}:{email:string,password:string}){
//     try {
//         const {data, error} = await supabase.auth.signInWithPassword({email,password})
//         if (error) throw error;
//         console.log(data)
//         return data;
//     } catch (err) {
//         console.log('Sign Up failed:',err)
//     }
// }

// export async function signOut() {
//   const { error } = await supabase.auth.signOut()
//   if (error) throw error
// }

// export async function getSession() {
//   const { data, error } = await supabase.auth.getSession();
//   if (error) throw error;
//   return data.session;
// }

// // ✅ NEW: Get only the user
// export async function getUser() {
//   const { data, error } = await supabase.auth.getUser();
//   if (error) throw error;
//   return data.user;
// }