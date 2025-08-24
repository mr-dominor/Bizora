/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/services/authContext";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {signIn,user} = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const {email,password} = form
    try {
      await signIn({ email, password });
      // Successfully signed in, now you can redirect or show logged-in UI
      setSuccess("SignIn successful")
      console.log("Signed in!",user);
      

    } catch (err:any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white text-black flex justify-center items-center">
      <div className="w-screen h-16 bg-maroon fixed top-0"></div>

      <div className="h-[400px] w-96 bg-beige rounded-xl border-2 border-solid flex flex-col justify-center items-center shadow-lg p-6">
        <h1 className="text-2xl font-serif mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password} 
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-maroon text-white py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="p-2">New here?<Link href={`/signup`} className="text-blue-400">Signup</Link></p>
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        {success && <p className="mt-3 text-green-700 text-sm">{success}</p>}
      </div>
    </div>
  );
}
