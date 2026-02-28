import React from "react";
import styles from "./styles.module.css";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
}: GlassCardProps) {
  return (
    <div className={`${styles.card} ${className}`} data-variant={variant}>
      {/* Gradient overlay for extra glow */}
      <div className={styles.overlay} />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
