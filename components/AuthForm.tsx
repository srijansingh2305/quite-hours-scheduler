// import { useState } from 'react'
// import { supabaseClient } from '@/utils/auth'
// import toast from 'react-hot-toast'

// interface AuthFormProps {
//   mode: 'login' | 'signup'
//   onSuccess: () => void
// }

// export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       if (mode === 'signup') {
//         const { error } = await supabaseClient.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/api/auth/callback`
//           }
//         })
//         if (error) throw error
//         toast.success('Check your email to confirm your account!')
//       } else {
//         const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
//         if (error) throw error
//         toast.success('Signed in successfully!')
//         onSuccess()
//       }
//     } catch (err: unknown) {
//       const error = err as { message?: string }
//       toast.error(error.message || 'Authentication failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           {mode === 'login' ? 'Sign In' : 'Sign Up'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
//           >
//             {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }


import { useState } from "react";
import { supabaseClient } from "@/utils/auth";
import toast from "react-hot-toast";
import styles from "../styles/AuthForm.module.css";
import Button from "./Button";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess: () => void;
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in successfully!");
        onSuccess();
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{mode === "login" ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Email */}
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            title="Enter your email"
          />
        </div>

        {/* Password */}
        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            title="Enter your password"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}

