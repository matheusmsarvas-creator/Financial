import React, { createContext, useContext, useState } from 'react';

export type TransactionType = 'income' | 'expense';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  recurrence: RecurrenceType;
  isPending?: boolean;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
  color: string;
}

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateBudget: (category: string, limit: number) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Salário',
      amount: 5000,
      type: 'income',
      category: 'Salário',
      date: '2026-02-01',
      recurrence: 'monthly',
    },
    {
      id: '2',
      description: 'Aluguel',
      amount: 1200,
      type: 'expense',
      category: 'Moradia',
      date: '2026-02-05',
      recurrence: 'monthly',
    },
    {
      id: '3',
      description: 'Supermercado',
      amount: 450,
      type: 'expense',
      category: 'Alimentação',
      date: '2026-02-10',
      recurrence: 'none',
    },
    {
      id: '4',
      description: 'Netflix',
      amount: 49.90,
      type: 'expense',
      category: 'Lazer',
      date: '2026-02-15',
      recurrence: 'monthly',
    },
    {
      id: '5',
      description: 'Conta de Luz',
      amount: 180,
      type: 'expense',
      category: 'Moradia',
      date: '2026-02-20',
      recurrence: 'monthly',
      isPending: true,
    },
    {
      id: '6',
      description: 'Academia',
      amount: 120,
      type: 'expense',
      category: 'Saúde',
      date: '2026-02-22',
      recurrence: 'monthly',
    },
    {
      id: '7',
      description: 'Restaurante',
      amount: 250,
      type: 'expense',
      category: 'Alimentação',
      date: '2026-02-25',
      recurrence: 'none',
    },
    {
      id: '8',
      description: 'Freelance',
      amount: 800,
      type: 'income',
      category: 'Trabalho Extra',
      date: '2026-02-27',
      recurrence: 'none',
    },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: 'Alimentação', limit: 1000, spent: 700, color: '#3B82F6' },
    { category: 'Moradia', limit: 1500, spent: 1380, color: '#06B6D4' },
    { category: 'Lazer', limit: 300, spent: 49.90, color: '#10B981' },
    { category: 'Saúde', limit: 200, spent: 120, color: '#EF4444' },
    { category: 'Transporte', limit: 400, spent: 0, color: '#8B5CF6' },
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);

    // Atualiza o budget se for despesa
    if (transaction.type === 'expense') {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.category === transaction.category
            ? { ...budget, spent: budget.spent + transaction.amount }
            : budget
        )
      );
    }
  };

  const updateBudget = (category: string, limit: number) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.category === category ? { ...budget, limit } : budget
      )
    );
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction && transaction.type === 'expense') {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.category === transaction.category
            ? { ...budget, spent: Math.max(0, budget.spent - transaction.amount) }
            : budget
        )
      );
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        addTransaction,
        updateBudget,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
