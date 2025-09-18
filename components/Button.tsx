import styles from "../styles/Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({ children, onClick, type = "button", disabled }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
