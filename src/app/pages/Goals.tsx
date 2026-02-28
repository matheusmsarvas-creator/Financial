import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Target, Plus, Trash2, TrendingUp, Calendar, DollarSign, Percent, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyDeposit: number;
  deadline: string;
  color: string;
  icon: string;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Viagem para Europa',
      targetAmount: 15000,
      currentAmount: 4500,
      monthlyDeposit: 750,
      deadline: '2027-06-01',
      color: '#3B82F6',
      icon: '✈️',
    },
    {
      id: '2',
      name: 'Reserva de Emergência',
      targetAmount: 30000,
      currentAmount: 12000,
      monthlyDeposit: 1000,
      deadline: '2027-12-01',
      color: '#10B981',
      icon: '🛡️',
    },
    {
      id: '3',
      name: 'Carro Novo',
      targetAmount: 80000,
      currentAmount: 8000,
      monthlyDeposit: 2000,
      deadline: '2029-02-01',
      color: '#06B6D4',
      icon: '🚗',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    icon: '🎯',
  });

  const [calculator, setCalculator] = useState({
    targetAmount: '',
    currentAmount: '0',
    months: '',
    monthlyDeposit: 0,
    totalDeposits: 0,
    interestRate: 0.5, // 0.5% ao mês
  });

  const totalGoalsValue = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalMonthlyDeposit = goals.reduce((sum, g) => sum + g.monthlyDeposit, 0);

  const calculateMonthlyDeposit = (target: number, current: number, months: number, rate: number = 0.005) => {
    if (months <= 0) return 0;
    const remaining = target - current;
    if (rate === 0) return remaining / months;
    // Fórmula de anuidade com juros compostos
    const monthlyPayment = (remaining * rate) / (1 - Math.pow(1 + rate, -months));
    return monthlyPayment;
  };

  const calculateMonths = (target: number, current: number, monthly: number, rate: number = 0.005) => {
    if (monthly <= 0) return 0;
    const remaining = target - current;
    if (rate === 0) return Math.ceil(remaining / monthly);
    // Fórmula inversa para calcular períodos
    const months = Math.log(1 - (remaining * rate) / monthly) / Math.log(1 + rate);
    return Math.ceil(Math.abs(months));
  };

  const handleCalculate = () => {
    const target = parseFloat(calculator.targetAmount);
    const current = parseFloat(calculator.currentAmount);
    const months = parseInt(calculator.months);

    if (target && months && target > current) {
      const monthly = calculateMonthlyDeposit(target, current, months, calculator.interestRate / 100);
      const total = monthly * months;
      
      setCalculator({
        ...calculator,
        monthlyDeposit: monthly,
        totalDeposits: total,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(formData.targetAmount);
    const current = parseFloat(formData.currentAmount);
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    const months = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthly = calculateMonthlyDeposit(target, current, months);

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: formData.name,
      targetAmount: target,
      currentAmount: current,
      monthlyDeposit: monthly,
      deadline: formData.deadline,
      color: ['#3B82F6', '#10B981', '#06B6D4', '#8B5CF6', '#F59E0B'][Math.floor(Math.random() * 5)],
      icon: formData.icon,
    };

    setGoals([...goals, newGoal]);
    setShowModal(false);
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: '',
      icon: '🎯',
    });
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const getMonthsRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const months = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return Math.max(0, months);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden" style={{ background: '#0A0F24' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
            top: '20%',
            right: '10%',
            animation: 'pulse 5s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            bottom: '20%',
            left: '10%',
            animation: 'pulse 5s ease-in-out infinite 2.5s',
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
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
              }}
            >
              <Target className="w-6 h-6" style={{ color: '#F8FAFC' }} />
            </div>
            <div>
              <h1 style={{ color: '#F8FAFC' }}>Metas Financeiras</h1>
              <p style={{ color: '#94A3B8' }}>Planeje e acompanhe seus objetivos</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCalculator(true)}
              className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
              style={{
                background: 'rgba(6, 182, 212, 0.2)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                color: '#06B6D4',
              }}
            >
              <DollarSign className="w-5 h-5" />
              Calculadora
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                color: '#F8FAFC',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Plus className="w-5 h-5" />
              Nova Meta
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
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
                <p style={{ color: '#94A3B8' }}>Meta Total</p>
                <Target className="w-5 h-5" style={{ color: '#3B82F6' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                R$ {totalGoalsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
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
                <p style={{ color: '#94A3B8' }}>Total Guardado</p>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(totalSaved / totalGoalsValue) * 100}%`,
                      background: '#10B981',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                    }}
                  />
                </div>
                <span style={{ color: '#10B981', fontSize: '14px' }}>
                  {((totalSaved / totalGoalsValue) * 100).toFixed(1)}%
                </span>
              </div>
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
                  background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Depósito Mensal</p>
                <TrendingUp className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>
                R$ {totalMonthlyDeposit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p style={{ color: '#06B6D4', fontSize: '14px' }}>Total necessário</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const monthsRemaining = getMonthsRemaining(goal.deadline);
            const isOnTrack = goal.currentAmount >= (goal.targetAmount * (1 - monthsRemaining / 24));

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <GlassCard variant="default" className="p-8 group hover:scale-[1.01] transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{
                          background: `${goal.color}20`,
                          border: `2px solid ${goal.color}40`,
                          boxShadow: `0 0 20px ${goal.color}30`,
                        }}
                      >
                        {goal.icon}
                      </div>
                      <div>
                        <h3 className="mb-1" style={{ color: '#F8FAFC', fontSize: '20px' }}>
                          {goal.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: '#94A3B8' }} />
                            <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                              {monthsRemaining} meses restantes
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isOnTrack ? (
                              <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
                            ) : (
                              <AlertCircle className="w-4 h-4" style={{ color: '#F59E0B' }} />
                            )}
                            <span style={{ color: isOnTrack ? '#10B981' : '#F59E0B', fontSize: '14px' }}>
                              {isOnTrack ? 'No caminho certo' : 'Atenção necessária'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:scale-110"
                      style={{ background: 'rgba(239, 68, 68, 0.2)' }}
                    >
                      <Trash2 className="w-5 h-5" style={{ color: '#EF4444' }} />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ color: '#94A3B8', fontSize: '14px' }}>Progresso</span>
                      <span style={{ color: goal.color, fontSize: '14px', fontWeight: 600 }}>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="relative h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${goal.color} 0%, ${goal.color}BB 100%)`,
                          boxShadow: `0 0 10px ${goal.color}80`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                        Guardado
                      </p>
                      <p style={{ color: '#F8FAFC', fontSize: '18px', fontWeight: 600 }}>
                        R$ {goal.currentAmount.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                        Meta
                      </p>
                      <p style={{ color: '#F8FAFC', fontSize: '18px', fontWeight: 600 }}>
                        R$ {goal.targetAmount.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                        Mensal
                      </p>
                      <p style={{ color: goal.color, fontSize: '18px', fontWeight: 600 }}>
                        R$ {goal.monthlyDeposit.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                        Faltam
                      </p>
                      <p style={{ color: '#F8FAFC', fontSize: '18px', fontWeight: 600 }}>
                        R$ {(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {goals.length === 0 && (
          <GlassCard variant="subtle" className="p-12 text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'rgba(59, 130, 246, 0.2)' }}
            >
              <Target className="w-10 h-10" style={{ color: '#3B82F6' }} />
            </div>
            <h3 className="mb-2" style={{ color: '#F8FAFC' }}>Nenhuma meta criada</h3>
            <p className="mb-6" style={{ color: '#94A3B8' }}>
              Comece definindo seus objetivos financeiros
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-xl transition-all hover:scale-105"
              style={{
                background: '#3B82F6',
                color: '#F8FAFC',
              }}
            >
              Criar Primeira Meta
            </button>
          </GlassCard>
        )}
      </motion.div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <GlassCard variant="strong" className="p-8">
                <h2 className="mb-6" style={{ color: '#F8FAFC' }}>Calculadora de Metas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Quanto você quer juntar?
                    </label>
                    <input
                      type="number"
                      value={calculator.targetAmount}
                      onChange={(e) => setCalculator({ ...calculator, targetAmount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="10000"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Quanto você já tem?
                    </label>
                    <input
                      type="number"
                      value={calculator.currentAmount}
                      onChange={(e) => setCalculator({ ...calculator, currentAmount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Em quantos meses?
                    </label>
                    <input
                      type="number"
                      value={calculator.months}
                      onChange={(e) => setCalculator({ ...calculator, months: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="12"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Taxa de Juros (% ao mês)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={calculator.interestRate}
                      onChange={(e) => setCalculator({ ...calculator, interestRate: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="0.5"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full px-6 py-4 rounded-xl mb-6 transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                    color: '#F8FAFC',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  Calcular
                </button>

                {calculator.monthlyDeposit > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div
                      className="p-6 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '8px' }}>
                        Você precisa guardar mensalmente:
                      </p>
                      <p style={{ color: '#F8FAFC', fontSize: '36px', fontWeight: 700, textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                        R$ {calculator.monthlyDeposit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="p-4 rounded-xl"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                          Total de Depósitos
                        </p>
                        <p style={{ color: '#F8FAFC', fontSize: '20px', fontWeight: 600 }}>
                          R$ {calculator.totalDeposits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div
                        className="p-4 rounded-xl"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>
                          Rendimento Estimado
                        </p>
                        <p style={{ color: '#10B981', fontSize: '20px', fontWeight: 600 }}>
                          R$ {(parseFloat(calculator.targetAmount) - parseFloat(calculator.currentAmount) - calculator.totalDeposits).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
                    >
                      <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.6 }}>
                        💡 <strong style={{ color: '#F8FAFC' }}>Dica:</strong> Considere investir em uma aplicação com
                        rendimento para alcançar sua meta mais rápido. Com {calculator.interestRate}% ao mês, você terá
                        um ganho estimado de R$ {(parseFloat(calculator.targetAmount) - parseFloat(calculator.currentAmount) - calculator.totalDeposits).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em rendimentos!
                      </p>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={() => setShowCalculator(false)}
                  className="w-full px-6 py-3 rounded-xl mt-6 transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F8FAFC',
                  }}
                >
                  Fechar
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Goal Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard variant="strong" className="p-8">
                <h2 className="mb-6" style={{ color: '#F8FAFC' }}>Nova Meta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Nome da Meta
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="Ex: Viagem para Europa"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Ícone
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {['🎯', '✈️', '🚗', '🏠', '🛡️', '💰', '📚', '🎓', '💍', '🎮', '🏖️', '🎸'].map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className="p-3 rounded-xl text-2xl transition-all hover:scale-110"
                          style={{
                            background: formData.icon === icon ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                            border: formData.icon === icon ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Valor da Meta
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="15000.00"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Valor Atual (opcional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.currentAmount}
                      onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: '#F8FAFC' }}>
                      Data Limite
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#F8FAFC',
                      }}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl transition-all hover:scale-105"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#F8FAFC',
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-xl transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                        color: '#F8FAFC',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      Criar Meta
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
      `}</style>
    </div>
  );
}
