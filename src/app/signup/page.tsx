"use client";

import { useState } from "react";
import { useAuth } from "@/services/authContext";
import Link from "next/link";
export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phonenumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {signUp} = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const {name,email,phonenumber,password,address} = form;
    try {
      const res =await signUp({name,email,phonenumber,password,address});
      console.log(res)
       if (res?.length === 0) {
         setError("Signup failed");
       } else {
        setSuccess("Signup successful!");
        setForm({
          name: "",
          email: "",
          password: "",
          address: "",
          phonenumber: "",
        });
       }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white text-black flex justify-center items-center">
      <div className="w-screen h-16 bg-maroon fixed top-0"></div>
      
      <div className="h-[500px] w-96 bg-beige rounded-xl border-2 border-solid flex flex-col justify-center items-center shadow-lg p-6">
        <h1 className={`text-2xl font-serif mb-4`}>Signup</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
          />
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
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
          />
          <input
            type="tel"
            name="phonenumber"
            placeholder="Phone Number"
            value={form.phonenumber}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-maroon text-white py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Create account"}
          </button>
        </form>
        <p className="p-2">Already have an account?<Link href={`/signin`} className="text-blue-400">Signin</Link></p>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        {success && <p className="mt-3 text-green-700 text-sm">{success}</p>}
      </div>
    </div>
  );
}
