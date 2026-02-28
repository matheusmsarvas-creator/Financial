import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Building2, CreditCard, DollarSign, Link2, CheckCircle2, AlertCircle, Loader2, Shield, Lock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Bank {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  accounts?: {
    type: string;
    balance: number;
    lastUpdate: string;
  }[];
}

export function OpenFinance() {
  const [banks, setBanks] = useState<Bank[]>([
    {
      id: '1',
      name: 'Nubank',
      logo: '🟣',
      connected: true,
      accounts: [
        { type: 'Conta Corrente', balance: 2450.80, lastUpdate: '2026-02-28 10:30' },
        { type: 'Cartão de Crédito', balance: -850.00, lastUpdate: '2026-02-28 10:30' },
      ],
    },
    {
      id: '2',
      name: 'Inter',
      logo: '🟠',
      connected: true,
      accounts: [
        { type: 'Conta Corrente', balance: 1200.50, lastUpdate: '2026-02-28 09:15' },
      ],
    },
    {
      id: '3',
      name: 'Itaú',
      logo: '🔵',
      connected: false,
    },
    {
      id: '4',
      name: 'Bradesco',
      logo: '🔴',
      connected: false,
    },
    {
      id: '5',
      name: 'Banco do Brasil',
      logo: '🟡',
      connected: false,
    },
    {
      id: '6',
      name: 'Santander',
      logo: '🔴',
      connected: false,
    },
  ]);

  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleConnect = (bank: Bank) => {
    setSelectedBank(bank);
    setShowConnectionModal(true);
  };

  const handleConfirmConnection = () => {
    if (selectedBank) {
      setIsConnecting(selectedBank.id);
      setShowConnectionModal(false);
      
      // Simula conexão
      setTimeout(() => {
        setBanks(prev =>
          prev.map(b =>
            b.id === selectedBank.id
              ? {
                  ...b,
                  connected: true,
                  accounts: [
                    { type: 'Conta Corrente', balance: Math.random() * 5000, lastUpdate: new Date().toLocaleString('pt-BR') },
                  ],
                }
              : b
          )
        );
        setIsConnecting(null);
      }, 2000);
    }
  };

  const handleDisconnect = (bankId: string) => {
    setBanks(prev =>
      prev.map(b =>
        b.id === bankId ? { ...b, connected: false, accounts: undefined } : b
      )
    );
  };

  const totalBalance = banks.reduce((sum, bank) => {
    if (bank.accounts) {
      return sum + bank.accounts.reduce((acc, account) => acc + account.balance, 0);
    }
    return sum;
  }, 0);

  const connectedBanks = banks.filter(b => b.connected);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden" style={{ background: '#0A0F24' }}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
            animation: 'pulse 4s ease-in-out infinite 2s',
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
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }}
            >
              <Link2 className="w-6 h-6" style={{ color: '#F8FAFC' }} />
            </div>
            <div>
              <h1 style={{ color: '#F8FAFC' }}>Open Finance</h1>
              <p style={{ color: '#94A3B8' }}>Conecte suas contas bancárias de forma segura</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
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
                  background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Saldo Total</p>
                <DollarSign className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p style={{ color: '#10B981', fontSize: '14px' }}>Todas as contas</p>
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
                  background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="flex items-center justify-between mb-2">
                <p style={{ color: '#94A3B8' }}>Bancos Conectados</p>
                <Building2 className="w-5 h-5" style={{ color: '#3B82F6' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                {connectedBanks.length}
              </p>
              <p style={{ color: '#3B82F6', fontSize: '14px' }}>de {banks.length} disponíveis</p>
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
                <p style={{ color: '#94A3B8' }}>Contas Ativas</p>
                <CreditCard className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="mb-1" style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 700, textShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>
                {banks.reduce((sum, b) => sum + (b.accounts?.length || 0), 0)}
              </p>
              <p style={{ color: '#06B6D4', fontSize: '14px' }}>Sincronizadas</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard variant="subtle" className="p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16, 185, 129, 0.2)' }}
              >
                <Shield className="w-6 h-6" style={{ color: '#10B981' }} />
              </div>
              <div>
                <h3 className="mb-2" style={{ color: '#F8FAFC' }}>Conexão 100% Segura</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6 }}>
                  Utilizamos Open Finance, regulamentado pelo Banco Central. Suas credenciais são criptografadas
                  e nunca armazenadas. Você tem controle total sobre quais dados compartilhar e pode revogar
                  o acesso a qualquer momento.
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" style={{ color: '#10B981' }} />
                    <span style={{ color: '#10B981', fontSize: '14px' }}>Criptografia de ponta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" style={{ color: '#10B981' }} />
                    <span style={{ color: '#10B981', fontSize: '14px' }}>Somente leitura</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Connected Banks */}
        {connectedBanks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="mb-4" style={{ color: '#F8FAFC' }}>Contas Conectadas</h2>
            <div className="space-y-4">
              {connectedBanks.map((bank, index) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <GlassCard variant="default" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {bank.logo}
                        </div>
                        <div>
                          <h3 style={{ color: '#F8FAFC' }}>{bank.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
                            <span style={{ color: '#10B981', fontSize: '14px' }}>Conectado</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDisconnect(bank.id)}
                        className="px-4 py-2 rounded-lg transition-all hover:scale-105"
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#EF4444',
                        }}
                      >
                        Desconectar
                      </button>
                    </div>
                    <div className="space-y-3">
                      {bank.accounts?.map((account, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl"
                          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p style={{ color: '#F8FAFC' }}>{account.type}</p>
                              <p style={{ color: '#94A3B8', fontSize: '12px' }}>
                                Atualizado em {account.lastUpdate}
                              </p>
                            </div>
                            <p
                              style={{
                                color: account.balance >= 0 ? '#10B981' : '#EF4444',
                                fontSize: '20px',
                                fontWeight: 600,
                              }}
                            >
                              R$ {Math.abs(account.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available Banks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-4" style={{ color: '#F8FAFC' }}>Bancos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banks
              .filter(b => !b.connected)
              .map((bank, index) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <GlassCard variant="subtle" className="p-6 hover:scale-105 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {bank.logo}
                        </div>
                        <div>
                          <h3 style={{ color: '#F8FAFC', fontSize: '16px' }}>{bank.name}</h3>
                          <p style={{ color: '#94A3B8', fontSize: '12px' }}>Disponível</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleConnect(bank)}
                        disabled={isConnecting === bank.id}
                        className="px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
                        style={{
                          background: isConnecting === bank.id ? 'rgba(148, 163, 184, 0.2)' : '#3B82F6',
                          color: '#F8FAFC',
                          opacity: isConnecting === bank.id ? 0.7 : 1,
                        }}
                      >
                        {isConnecting === bank.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          'Conectar'
                        )}
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectionModal && selectedBank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowConnectionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard variant="strong" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {selectedBank.logo}
                  </div>
                  <div>
                    <h2 style={{ color: '#F8FAFC' }}>Conectar {selectedBank.name}</h2>
                    <p style={{ color: '#94A3B8', fontSize: '14px' }}>Open Finance</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
                  >
                    <p style={{ color: '#F8FAFC', fontSize: '14px', lineHeight: 1.6 }}>
                      Você será redirecionado para o ambiente seguro do {selectedBank.name} para
                      autorizar o acesso aos seus dados.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                      <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                        Acesso somente leitura às suas contas
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                      <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                        Não armazenamos suas senhas
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                      <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                        Você pode revogar o acesso a qualquer momento
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConnectionModal(false)}
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
                    onClick={handleConfirmConnection}
                    className="flex-1 px-6 py-3 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                      color: '#F8FAFC',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                    }}
                  >
                    Conectar
                  </button>
                </div>
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
