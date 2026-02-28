import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { LayoutDashboard, Receipt, Target, TrendingUp, Link2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Layout() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: Receipt, label: 'Transações' },
    { to: '/planning', icon: Target, label: 'Planejamento' },
    { to: '/goals', icon: Sparkles, label: 'Metas' },
    { to: '/open-finance', icon: Link2, label: 'Open Finance' },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: '#0A0F24' }}>
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            bottom: '-10%',
            right: '-10%',
            animation: 'float 20s ease-in-out infinite 10s',
          }}
        />
      </div>

      {/* Top Navigation with glassmorphism */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-2xl"
        style={{
          background: 'rgba(10, 15, 36, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with glow effect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <TrendingUp className="w-7 h-7 relative z-10" style={{ color: '#F8FAFC' }} />
              </div>
              <div>
                <h1
                  style={{
                    color: '#F8FAFC',
                    fontSize: '22px',
                    fontWeight: 700,
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                  }}
                >
                  FinanceFlow
                </h1>
                <p
                  style={{
                    color: '#94A3B8',
                    fontSize: '12px',
                    background: 'linear-gradient(90deg, #94A3B8 0%, #06B6D4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Controle Financeiro Inteligente
                </p>
              </div>
            </motion.div>

            {/* Navigation Links with glassmorphism */}
            <div className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all relative overflow-hidden ${
                        isActive ? 'scale-105' : 'hover:scale-105'
                      }`
                    }
                    style={({ isActive }) => ({
                      background: isActive
                        ? 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
                        : 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      color: '#F8FAFC',
                      border: isActive
                        ? '1px solid rgba(255, 255, 255, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isActive
                        ? '0 0 20px rgba(59, 130, 246, 0.4)'
                        : 'none',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
                              animation: 'shimmer 3s ease-in-out infinite',
                            }}
                          />
                        )}
                        <item.icon className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}