import React, { useState, useMemo } from "react";
import { GlassCard } from "../components/GlassCard";
import { useFinance } from "../context/FinanceContext";
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit2,
} from "lucide-react";
import { motion } from "motion/react";

export function Planning() {
  const { budgets, updateBudget, transactions } = useFinance();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const totalIncome = useMemo(() => {
    const currentMonth = new Date().getMonth();
    return transactions
      .filter(
        (t) =>
          t.type === "income" && new Date(t.date).getMonth() === currentMonth,
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  const handleEditBudget = (category: string, currentLimit: number) => {
    setEditingCategory(category);
    setEditValue(currentLimit.toString());
  };

  const handleSaveBudget = (category: string) => {
    updateBudget(category, parseFloat(editValue));
    setEditingCategory(null);
  };

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "#EF4444";
    if (percentage >= 70) return "#F59E0B";
    return "#10B981";
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "#0A0F24" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#F8FAFC" }}>
            Planejamento
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Gerencie seus limites e metas financeiras
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: "#94A3B8" }}>Receita do Mês</p>
                <TrendingUp className="w-5 h-5" style={{ color: "#10B981" }} />
              </div>
              <p
                className="mb-1"
                style={{ color: "#F8FAFC", fontSize: "28px", fontWeight: 600 }}
              >
                R${" "}
                {totalIncome.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: "#94A3B8" }}>Orçamento Total</p>
                <Target className="w-5 h-5" style={{ color: "#3B82F6" }} />
              </div>
              <p
                className="mb-1"
                style={{ color: "#F8FAFC", fontSize: "28px", fontWeight: 600 }}
              >
                R${" "}
                {totalBudget.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="flex-1 h-2 rounded-full"
                  style={{ background: "rgba(255, 255, 255, 0.1)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((totalBudget / totalIncome) * 100, 100)}%`,
                      background: "#3B82F6",
                    }}
                  />
                </div>
                <span style={{ color: "#94A3B8", fontSize: "14px" }}>
                  {((totalBudget / totalIncome) * 100).toFixed(0)}%
                </span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: "#94A3B8" }}>Disponível</p>
                <CheckCircle className="w-5 h-5" style={{ color: "#06B6D4" }} />
              </div>
              <p
                className="mb-1"
                style={{ color: "#F8FAFC", fontSize: "28px", fontWeight: 600 }}
              >
                R${" "}
                {(totalIncome - totalSpent).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Budget Categories */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ color: "#F8FAFC" }}>Orçamento por Categoria</h2>
            <p style={{ color: "#94A3B8", fontSize: "14px" }}>
              Clique no ícone de edição para ajustar os limites
            </p>
          </div>

          <div className="space-y-6">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.limit) * 100;
              const progressColor = getProgressColor(
                budget.spent,
                budget.limit,
              );
              const isEditing = editingCategory === budget.category;

              return (
                <motion.div
                  key={budget.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: budget.color }}
                      />
                      <h3 style={{ color: "#F8FAFC" }}>{budget.category}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p style={{ color: "#F8FAFC" }}>
                          R${" "}
                          {budget.spent.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                          {" de "}
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleSaveBudget(budget.category)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleSaveBudget(budget.category);
                                if (e.key === "Escape")
                                  setEditingCategory(null);
                              }}
                              autoFocus
                              className="inline-block w-24 px-2 py-1 rounded"
                              style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid #3B82F6",
                                color: "#F8FAFC",
                              }}
                            />
                          ) : (
                            <span>
                              R${" "}
                              {budget.limit.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </p>
                        <p style={{ color: progressColor, fontSize: "14px" }}>
                          {percentage.toFixed(1)}% utilizado
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleEditBudget(budget.category, budget.limit)
                        }
                        className="p-2 rounded-lg hover:scale-110 transition-all"
                        style={{ background: "rgba(59, 130, 246, 0.2)" }}
                      >
                        <Edit2
                          className="w-4 h-4"
                          style={{ color: "#3B82F6" }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className="relative h-3 rounded-full overflow-hidden"
                    style={{ background: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                      style={{ background: progressColor }}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="mt-3 flex items-center gap-2">
                    {percentage >= 90 ? (
                      <>
                        <AlertCircle
                          className="w-4 h-4"
                          style={{ color: "#EF4444" }}
                        />
                        <span style={{ color: "#EF4444", fontSize: "14px" }}>
                          Atenção! Limite quase atingido
                        </span>
                      </>
                    ) : percentage >= 70 ? (
                      <>
                        <AlertCircle
                          className="w-4 h-4"
                          style={{ color: "#F59E0B" }}
                        />
                        <span style={{ color: "#F59E0B", fontSize: "14px" }}>
                          Fique atento ao seu gasto
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "#10B981" }}
                        />
                        <span style={{ color: "#10B981", fontSize: "14px" }}>
                          Gastos sob controle
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <GlassCard className="p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(6, 182, 212, 0.2)" }}
              >
                <Target className="w-6 h-6" style={{ color: "#06B6D4" }} />
              </div>
              <div>
                <h3 className="mb-2" style={{ color: "#F8FAFC" }}>
                  Dica de Planejamento
                </h3>
                <p style={{ color: "#94A3B8", lineHeight: 1.6 }}>
                  Uma boa prática é destinar no máximo 50% da sua receita para
                  despesas essenciais (moradia, alimentação, transporte), 30%
                  para gastos pessoais (lazer, saúde) e reservar 20% para
                  investimentos e poupança. Ajuste seus limites clicando no
                  ícone de edição ao lado de cada categoria.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
