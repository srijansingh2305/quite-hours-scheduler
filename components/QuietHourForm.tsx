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
    <div className={styles.form}>
      <h2>Create New Quiet Hour</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label htmlFor="title" className={styles.label}>
            Session Title *
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

        <div className={styles.timeGrid}>
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
        </div>

        <div className={styles.group}>
          <label htmlFor="description" className={styles.label}>
            Description (Optional)
          </label>
          <textarea
            id="description"
            rows={3}
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any notes about your study session..."
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Quiet Hour"}
        </Button>
      </form>
    </div>
  );
}