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

  const getStatus = (startTime: Date, endTime: Date) => {
    const now = new Date();
    if (now < startTime) return 'upcoming';
    if (now > endTime) return 'completed';
    return 'active';
  };

  const formatDateTime = (date: Date) => {
    return format(new Date(date), "PPP 'at' h:mm a");
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

  if (loading) {
    return (
      <div className={styles.list}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your quiet hours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <h2 className={styles.header}>Your Quiet Hours ({quietHours.length})</h2>
      
      {quietHours.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.icon}>📅</div>
          <p>No quiet hours scheduled yet.</p>
          <p className={styles.subtitle}>Create your first study session above!</p>
        </div>
      ) : (
        <>
          {quietHours.map((qh) => {
            const status = getStatus(new Date(qh.startTime), new Date(qh.endTime));
            return (
              <div key={qh._id} className={styles.item}>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{qh.title}</h3>
                  
                  <div className={styles.itemTime}>
                    {formatDateTime(qh.startTime)} - {format(new Date(qh.endTime), "h:mm a")}
                  </div>
                  
                  {qh.description && (
                    <p className={styles.itemDescription}>{qh.description}</p>
                  )}
                  
                  <div className={styles.itemMeta}>
                    <span className={`${styles.status} ${styles[status]}`}>
                      {status}
                    </span>
                    
                    {qh.emailSent && (
                      <span className={styles.emailSent}>Reminder sent</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(qh._id!)}
                  className={styles.remove}
                  title="Delete quiet hour"
                  aria-label="Delete quiet hour"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}