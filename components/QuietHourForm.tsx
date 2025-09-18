// import { useState } from 'react'
// import { validateQuietHour } from '@/utils/validation';
// import toast from 'react-hot-toast'

// interface QuietHourFormProps {
//   onSuccess: () => void
// }

// export default function QuietHourForm({ onSuccess }: QuietHourFormProps) {
//   const [title, setTitle] = useState('')
//   const [startTime, setStartTime] = useState('')
//   const [endTime, setEndTime] = useState('')
//   const [description, setDescription] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const validation = validateQuietHour({ title, startTime, endTime })
//     if (!validation.isValid) {
//       validation.errors.forEach(error => toast.error(error))
//       return
//     }

//     setLoading(true)

//     try {
//       const response = await fetch('/api/quiet-hours/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           startTime,
//           endTime,
//           description,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create quiet hour')
//       }

//       toast.success('Quiet hour created successfully!')
//       setTitle('')
//       setStartTime('')
//       setEndTime('')
//       setDescription('')
//       onSuccess()
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message)
//       } else {
//         toast.error('Failed to create quiet hour')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//   <div className="bg-white p-6 rounded-xl shadow-md border">
//     <h2 className="text-xl font-semibold text-gray-900 mb-4">
//       Create New Quiet Hour
//     </h2>
    
//     <form onSubmit={handleSubmit} className="space-y-5">
//       {/* Title */}
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//           Title *
//         </label>
//         <input
//           id="title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           placeholder="e.g., Morning Study Session"
//         />
//       </div>

//       {/* Time Pickers */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div>
//           <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
//             Start Time *
//           </label>
//           <input
//             id="startTime"
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
//             End Time *
//           </label>
//           <input
//             id="endTime"
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           id="description"
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           placeholder="Add notes about this session..."
//         />
//       </div>

//       {/* Button */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-2 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:opacity-50"
//       >
//         {loading ? 'Creating...' : 'Create Quiet Hour'}
//       </button>
//     </form>
//   </div>
// )

// }

import { useState } from "react";
import { validateQuietHour } from "@/utils/validation";
import toast from "react-hot-toast";
import styles from "../styles/QuietHourForm.module.css";
import Button from "./Button";

interface QuietHourFormProps {
  onSuccess: () => void;
}

export default function QuietHourForm({ onSuccess }: QuietHourFormProps) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateQuietHour({ title, startTime, endTime });
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/quiet-hours/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, startTime, endTime, description }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create quiet hour");

      toast.success("Quiet hour created successfully!");
      setTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to create quiet hour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create New Quiet Hour</h2>

      {/* Title */}
      <div className={styles.group}>
        <label htmlFor="title" className={styles.label}>
          Title *
        </label>
        <input
          id="title"
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Morning Study Session"
        />
      </div>

      {/* Start Time */}
      <div className={styles.group}>
        <label htmlFor="startTime" className={styles.label}>
          Start Time *
        </label>
        <input
          id="startTime"
          type="datetime-local"
          className={styles.input}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          title="Select the start time"
        />
      </div>

      {/* End Time */}
      <div className={styles.group}>
        <label htmlFor="endTime" className={styles.label}>
          End Time *
        </label>
        <input
          id="endTime"
          type="datetime-local"
          className={styles.input}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          title="Select the end time"
        />
      </div>

      {/* Description */}
      <div className={styles.group}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes about this session"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Quiet Hour"}
      </Button>
    </form>
  );
}

