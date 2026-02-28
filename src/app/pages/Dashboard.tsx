import React, { useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { useFinance } from '../context/FinanceContext';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const { transactions, budgets } = useFinance();

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const monthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === currentMonth
    );

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === 'expense' && !t.isPending)
      .reduce((sum, t) => sum + t.amount, 0);

    const pending = monthTransactions
      .filter((t) => t.type === 'expense' && t.isPending)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      pending,
      balance: income - expenses,
    };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    return months.map((month, index) => ({
      month,
      receitas: Math.random() * 3000 + 2000,
      despesas: Math.random() * 2000 + 1000,
    }));
  }, []);

  const categoryData = useMemo(() => {
    return budgets.map((budget) => ({
      name: budget.category,
      value: budget.spent,
      color: budget.color,
    }));
  }, [budgets]);

  const upcomingTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.isPending || new Date(t.date) > new Date())
      .slice(0, 5);
  }, [transactions]);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden" style={{ background: '#0A0F24' }}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
            top: '5%',
            right: '5%',
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            bottom: '5%',
            left: '5%',
            animation: 'pulse 6s ease-in-out infinite 3s',
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
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>
            Dashboard Financeiro
          </h1>
          <p style={{ color: '#94A3B8' }}>Visão geral das suas finanças em Fevereiro 2026</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard variant="strong" className="p-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Saldo Atual</p>
                <Wallet className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
                R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />
                <span style={{ color: '#10B981', fontSize: '14px' }}>+12.5% do mês passado</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="strong" className="p-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Receitas</p>
                <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                R$ {stats.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <span style={{ color: '#10B981', fontSize: '14px' }}>Este mês</span>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard variant="strong" className="p-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #EF4444 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Despesas</p>
                <TrendingDown className="w-5 h-5" style={{ color: '#EF4444' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>
                R$ {stats.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <span style={{ color: '#EF4444', fontSize: '14px' }}>Este mês</span>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard variant="strong" className="p-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Pendentes</p>
                <Clock className="w-5 h-5" style={{ color: '#3B82F6' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                R$ {stats.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <span style={{ color: '#3B82F6', fontSize: '14px' }}>A pagar</span>
            </GlassCard>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="mb-6" style={{ color: '#F8FAFC' }}>Receitas vs Despesas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10, 15, 36, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="receitas"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorReceitas)"
                  />
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDespesas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="mb-6" style={{ color: '#F8FAFC' }}>Distribuição por Categoria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10, 15, 36, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span style={{ color: '#94A3B8', fontSize: '14px' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Upcoming Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-6">
            <h3 className="mb-6" style={{ color: '#F8FAFC' }}>Próximos Lançamentos</h3>
            <div className="space-y-4">
              {upcomingTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          transaction.type === 'income'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
                      ) : (
                        <TrendingDown className="w-5 h-5" style={{ color: '#EF4444' }} />
                      )}
                    </div>
                    <div>
                      <p style={{ color: '#F8FAFC' }}>{transaction.description}</p>
                      <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                        {new Date(transaction.date).toLocaleDateString('pt-BR')} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      color: transaction.type === 'income' ? '#10B981' : '#EF4444',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    {transaction.type === 'income' ? '+' : '-'} R${' '}
                    {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}