import React, { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { useFinance } from "../context/FinanceContext";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Trash2,
  Filter,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
    recurrence: "none" as "none" | "daily" | "weekly" | "monthly" | "yearly",
  });

  const categories = {
    expense: [
      "Alimentação",
      "Moradia",
      "Transporte",
      "Lazer",
      "Saúde",
      "Educação",
      "Outros",
    ],
    income: ["Salário", "Trabalho Extra", "Investimentos", "Outros"],
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      recurrence: formData.recurrence,
    });
    setIsModalOpen(false);
    setFormData({
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
      recurrence: "none",
    });
  };

  return (
    <div
      className="min-h-screen p-6 relative overflow-hidden"
      style={{ background: "#0A0F24" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            top: "10%",
            left: "20%",
            animation: "pulse 5s ease-in-out infinite",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="mb-2"
              style={{
                color: "#F8FAFC",
                fontSize: "32px",
                fontWeight: 700,
                textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              Transações
            </h1>
            <p style={{ color: "#94A3B8" }}>
              Gerencie todos os seus lançamentos
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
              color: "#F8FAFC",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Novo Lançamento</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === "all" ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                filter === "all"
                  ? "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)"
                  : "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              color: "#F8FAFC",
              border:
                filter === "all"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                filter === "all" ? "0 0 20px rgba(59, 130, 246, 0.4)" : "none",
            }}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("income")}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === "income" ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                filter === "income" ? "#10B981" : "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              color: "#F8FAFC",
              border:
                filter === "income"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                filter === "income"
                  ? "0 0 20px rgba(16, 185, 129, 0.4)"
                  : "none",
            }}
          >
            Receitas
          </button>
          <button
            onClick={() => setFilter("expense")}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === "expense" ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                filter === "expense" ? "#EF4444" : "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              color: "#F8FAFC",
              border:
                filter === "expense"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                filter === "expense"
                  ? "0 0 20px rgba(239, 68, 68, 0.4)"
                  : "none",
            }}
          >
            Despesas
          </button>
        </div>

        {/* Transactions List */}
        <GlassCard variant="default" className="p-6">
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg group hover:scale-[1.01] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          transaction.type === "income"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp
                          className="w-6 h-6"
                          style={{ color: "#10B981" }}
                        />
                      ) : (
                        <TrendingDown
                          className="w-6 h-6"
                          style={{ color: "#EF4444" }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p style={{ color: "#F8FAFC", fontSize: "16px" }}>
                          {transaction.description}
                        </p>
                        {transaction.isPending && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{ background: "#3B82F6", color: "#F8FAFC" }}
                          >
                            Pendente
                          </span>
                        )}
                        {transaction.recurrence !== "none" && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              background: "rgba(6, 182, 212, 0.2)",
                              color: "#06B6D4",
                              border: "1px solid #06B6D4",
                            }}
                          >
                            Recorrente
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <p style={{ color: "#94A3B8", fontSize: "14px" }}>
                          {new Date(transaction.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </p>
                        <span style={{ color: "#94A3B8" }}>•</span>
                        <p style={{ color: "#94A3B8", fontSize: "14px" }}>
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      style={{
                        color:
                          transaction.type === "income" ? "#10B981" : "#EF4444",
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {transaction.type === "income" ? "+" : "-"} R${" "}
                      {transaction.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-500/20"
                    >
                      <Trash2
                        className="w-5 h-5"
                        style={{ color: "#EF4444" }}
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard className="p-6">
                <h2 className="mb-6" style={{ color: "#F8FAFC" }}>
                  Novo Lançamento
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Descrição
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                      placeholder="Ex: Supermercado"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Valor
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Tipo
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            type: "expense",
                            category: "",
                          })
                        }
                        className={`px-4 py-3 rounded-lg transition-all ${
                          formData.type === "expense" ? "scale-105" : ""
                        }`}
                        style={{
                          background:
                            formData.type === "expense"
                              ? "#EF4444"
                              : "rgba(255, 255, 255, 0.05)",
                          color: "#F8FAFC",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        Despesa
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            type: "income",
                            category: "",
                          })
                        }
                        className={`px-4 py-3 rounded-lg transition-all ${
                          formData.type === "income" ? "scale-105" : ""
                        }`}
                        style={{
                          background:
                            formData.type === "income"
                              ? "#10B981"
                              : "rgba(255, 255, 255, 0.05)",
                          color: "#F8FAFC",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        Receita
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Categoria
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                    >
                      <option value="">Selecione...</option>
                      {categories[formData.type].map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          style={{ background: "#0A0F24" }}
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#F8FAFC" }}>
                      Recorrência
                    </label>
                    <select
                      value={formData.recurrence}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recurrence: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                    >
                      <option value="none" style={{ background: "#0A0F24" }}>
                        Não se repete
                      </option>
                      <option value="daily" style={{ background: "#0A0F24" }}>
                        Diário
                      </option>
                      <option value="weekly" style={{ background: "#0A0F24" }}>
                        Semanal
                      </option>
                      <option value="monthly" style={{ background: "#0A0F24" }}>
                        Mensal
                      </option>
                      <option value="yearly" style={{ background: "#0A0F24" }}>
                        Anual
                      </option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 rounded-lg transition-all hover:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#F8FAFC",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-lg transition-all hover:scale-105"
                      style={{ background: "#3B82F6", color: "#F8FAFC" }}
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
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
