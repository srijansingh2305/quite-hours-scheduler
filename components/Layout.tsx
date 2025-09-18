import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>🔕 Quiet Hours Scheduler</h1>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
