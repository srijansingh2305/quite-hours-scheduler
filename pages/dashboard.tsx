import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import QuietHourForm from "@/components/QuietHourForm";
import QuietHoursList from "@/components/QuietHoursList";
import { signOut } from "@/utils/auth";
import toast from "react-hot-toast";
import Button from "@/components/Button";

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

  if (!user) return (
    <Layout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ fontSize: '1.2rem', color: '#4a5568' }}>Loading your dashboard...</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      {/* Welcome Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem 2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.5rem',
            letterSpacing: '-0.025em'
          }}>
            Dashboard
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            margin: 0
          }}>
            Welcome back, <strong>{user.email}</strong>!
          </p>
        </div>
        
        <Button onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <QuietHourForm onSuccess={handleFormSuccess} />
      <QuietHoursList refresh={refreshList} onRefresh={handleRefresh} />
    </Layout>
  );
}