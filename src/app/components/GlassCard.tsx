import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
}

export function GlassCard({ children, className = '', variant = 'default' }: GlassCardProps) {
  const variants = {
    default: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      blur: 'blur(20px)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      blur: 'blur(24px)',
    },
    subtle: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      blur: 'blur(16px)',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`rounded-2xl shadow-2xl relative overflow-hidden ${className}`}
      style={{
        background: style.background,
        border: style.border,
        backdropFilter: style.blur,
        WebkitBackdropFilter: style.blur,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      {/* Gradient overlay for extra glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}