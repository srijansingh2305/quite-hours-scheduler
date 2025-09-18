// import { useState, useEffect } from 'react'
// import { QuietHour } from '@/types'
// import toast from 'react-hot-toast'
// import { format } from 'date-fns'

// interface QuietHoursListProps {
//   refresh: boolean
//   onRefresh: () => void
// }

// export default function QuietHoursList({ refresh, onRefresh }: QuietHoursListProps) {
//   const [quietHours, setQuietHours] = useState<QuietHour[]>([])
//   const [loading, setLoading] = useState(true)

//   const fetchQuietHours = async () => {
//     try {
//       const response = await fetch('/api/quiet-hours/list')
//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to fetch quiet hours')
//       }

//       setQuietHours(data.quietHours)
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message)
//       } else {
//         toast.error('Failed to fetch quiet hours')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this quiet hour?')) {
//       return
//     }

//     try {
//       const response = await fetch(`/api/quiet-hours/delete?id=${id}`, {
//         method: 'DELETE'
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to delete quiet hour')
//       }

//       toast.success('Quiet hour deleted successfully!')
//       fetchQuietHours()
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message)
//       } else {
//         toast.error('Failed to delete quiet hour')
//       }
//     }
//   }

//   useEffect(() => {
//     fetchQuietHours()
//   }, [refresh])

//   useEffect(() => {
//     if (refresh) {
//       fetchQuietHours()
//       onRefresh()
//     }
//   }, [refresh, onRefresh])

//   if (loading) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-sm border">
//         <div className="animate-pulse">
//           <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="space-y-3">
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//   <div className="bg-white rounded-xl shadow-md border overflow-hidden">
//     <div className="p-6 border-b bg-gray-50">
//       <h2 className="text-xl font-semibold text-gray-900">
//         Your Quiet Hours ({quietHours.length})
//       </h2>
//     </div>

//     {quietHours.length === 0 ? (
//       <div className="p-6 text-center text-gray-500">
//         <div className="text-4xl mb-2">📅</div>
//         <p>No quiet hours scheduled yet.</p>
//         <p className="text-sm">Create your first study session above!</p>
//       </div>
//     ) : (
//       <div className="divide-y">
//         {quietHours.map((qh) => (
//           <div key={qh._id} className="p-6 hover:bg-gray-50 transition">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {qh.title}
//                 </h3>

//                 <div className="space-y-1 text-sm text-gray-600 mb-3">
//                   <p>📅 {format(new Date(qh.startTime), 'PPP')}</p>
//                   <p>⏰ {format(new Date(qh.startTime), 'h:mm a')} - {format(new Date(qh.endTime), 'h:mm a')}</p>
//                   {qh.emailSent && (
//                     <p className="text-green-600">✅ Reminder sent</p>
//                   )}
//                 </div>

//                 {qh.description && (
//                   <p className="text-gray-700 text-sm mb-3">{qh.description}</p>
//                 )}

//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   new Date(qh.startTime) > new Date()
//                     ? 'bg-blue-100 text-blue-800'
//                     : new Date(qh.endTime) < new Date()
//                     ? 'bg-gray-100 text-gray-800'
//                     : 'bg-green-100 text-green-800'
//                 }`}>
//                   {new Date(qh.startTime) > new Date()
//                     ? 'Upcoming'
//                     : new Date(qh.endTime) < new Date()
//                     ? 'Completed'
//                     : 'Active'}
//                 </span>
//               </div>

//               <button
//                 onClick={() => handleDelete(qh._id!)}
//                 className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                 title="Delete quiet hour"
//               >
//                 🗑️
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// )

// }

import { useState, useEffect } from "react";
import { QuietHour } from "@/types";
import toast from "react-hot-toast";
import { format } from "date-fns";
import styles from "../styles/QuietHoursList.module.css";

interface QuietHoursListProps {
  refresh: boolean;
  onRefresh: () => void;
}

export default function QuietHoursList({ refresh, onRefresh }: QuietHoursListProps) {
  const [quietHours, setQuietHours] = useState<QuietHour[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuietHours = async () => {
    try {
      const response = await fetch("/api/quiet-hours/list");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch quiet hours");
      setQuietHours(data.quietHours);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to fetch quiet hours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiet hour?")) return;

    try {
      const response = await fetch(`/api/quiet-hours/delete?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete quiet hour");
      toast.success("Quiet hour deleted successfully!");
      fetchQuietHours();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete quiet hour");
    }
  };

  useEffect(() => {
    fetchQuietHours();
  }, [refresh]);

  useEffect(() => {
    if (refresh) {
      fetchQuietHours();
      onRefresh();
    }
  }, [refresh, onRefresh]);

  if (loading) return <div className={styles.list}>Loading...</div>;

  return (
    <div className={styles.list}>
      <h2 className={styles.header}>Your Quiet Hours ({quietHours.length})</h2>
      {quietHours.length === 0 ? (
        <p>No quiet hours scheduled yet.</p>
      ) : (
        quietHours.map((qh) => (
          <div key={qh._id} className={styles.item}>
            <span className={styles.time}>
              {qh.title} — {format(new Date(qh.startTime), "PPP h:mm a")} to{" "}
              {format(new Date(qh.endTime), "h:mm a")}
            </span>
            <span className={styles.remove} onClick={() => handleDelete(qh._id!)}>
              🗑️
            </span>
          </div>
        ))
      )}
    </div>
  );
}
