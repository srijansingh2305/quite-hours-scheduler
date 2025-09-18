// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { useUser } from '@supabase/auth-helpers-react'
// import Layout from '@/components/Layout'
// import QuietHourForm from '@/components/QuietHourForm'
// import QuietHoursList from '@/components/QuietHoursList'
// import { signOut } from '@/utils/auth'
// import toast from 'react-hot-toast'

// export default function Dashboard() {
//   const [refreshList, setRefreshList] = useState(false)
//   const user = useUser()
//   const router = useRouter()

//   useEffect(() => {
//     if (!user) {
//       router.push('/login')
//     }
//   }, [user, router])

//   const handleFormSuccess = () => setRefreshList(true)
//   const handleRefresh = () => setRefreshList(false)

//   const handleSignOut = async () => {
//     const result = await signOut()
//     if (result.success) {
//       toast.success('Signed out successfully!')
//       router.push('/')
//     } else {
//       toast.error('Failed to sign out')
//     }
//   }

//   if (!user) {
//     return <Layout><div>Loading...</div></Layout>
//   }

//   return (
//     <Layout>
//       <div className="bg-red-500 text-white p-4 rounded-lg">
//         If you see a red box, Tailwind works!
//       </div>

//       <div className="min-h-screen bg-gray-100 py-10 px-4">
//         <div className="max-w-4xl mx-auto space-y-10">
//           {/* Header */}
//           <div className="flex justify-between items-center bg-white shadow rounded-lg p-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-gray-600">Welcome back, {user.email}!</p>
//             </div>
//             <button
//               onClick={handleSignOut}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
//             >
//               Sign Out
//             </button>
//           </div>

//           {/* Form */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Quiet Hour</h2>
//             <QuietHourForm onSuccess={handleFormSuccess} />
//           </div>

//           {/* List */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quiet Hours</h2>
//             <QuietHoursList refresh={refreshList} onRefresh={handleRefresh} />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }


import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import QuietHourForm from "@/components/QuietHourForm";
import QuietHoursList from "@/components/QuietHoursList";
import { signOut } from "@/utils/auth";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [refreshList, setRefreshList] = useState(false);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const handleFormSuccess = () => setRefreshList(true);
  const handleRefresh = () => setRefreshList(false);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success("Signed out successfully!");
      router.push("/");
    } else {
      toast.error("Failed to sign out");
    }
  };

  if (!user) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div style={{ background: "white", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
        <h1>Dashboard</h1>
        <p>Welcome back, {user.email}!</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <QuietHourForm onSuccess={handleFormSuccess} />
      <QuietHoursList refresh={refreshList} onRefresh={handleRefresh} />
    </Layout>
  );
}
