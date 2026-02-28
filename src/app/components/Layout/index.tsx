"use client";

import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  LayoutDashboard,
  Receipt,
  Target,
  Link2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../ui/utils";

import styles from "./styles.module.css";

export function Layout() {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/transactions", icon: Receipt, label: "Transações" },
    { to: "/planning", icon: Target, label: "Planejamento" },
    { to: "/goals", icon: Sparkles, label: "Metas" },
    { to: "/open-finance", icon: Link2, label: "Open Finance" },
  ];

  return (
    <div className={styles.layoutWrapper}>
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(styles.blobBase, styles.blobBlue)} />
        <div className={cn(styles.blobBase, styles.blobCyan)} />
      </div>

      {/* Top Navigation */}
      <nav className={styles.navbar}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className={styles.logoIconContainer}>
                <div className={styles.shimmerEffect} />
                <TrendingUp className="w-7 h-7 relative z-10 text-[#F8FAFC]" />
              </div>
              <div>
                <h1 className={styles.logoTitle}>FinanceFlow</h1>
                <p className={styles.logoSubtitle}>
                  Controle Financeiro Inteligente
                </p>
              </div>
            </motion.div>

            {/* Nav Items */}
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
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        styles.navLinkBase,
                        isActive ? styles.navLinkActive : styles.navLinkDefault,
                        isActive ? "scale-105" : "hover:scale-105",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div
                            className={cn(
                              styles.shimmerEffect,
                              styles.shimmerNavActive,
                            )}
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

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
