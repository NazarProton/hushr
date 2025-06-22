import React, { createContext, useState, ReactNode } from 'react';
import { Transaction, initialTransactions } from '../lib/mockData';

interface TransactionContextType {
  pendingTransactions: Transaction[];
  completedTransactions: Transaction[];
  addTransaction: (
    transaction: Omit<Transaction, 'id' | 'timestamp'>
  ) => string;
  updateTransactionStatus: (
    id: string,
    status: Transaction['status'],
    hash?: string
  ) => void;
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const addTransaction = (
    transactionData: Omit<Transaction, 'id' | 'timestamp'>
  ): string => {
    const transactionId = Date.now().toString();
    const newTransaction: Transaction = {
      ...transactionData,
      id: transactionId,
      timestamp: new Date(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    return transactionId;
  };

  const updateTransactionStatus = (
    id: string,
    status: Transaction['status'],
    hash?: string
  ) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status, hash } : tx))
    );
  };

  const pendingTransactions = transactions.filter(
    (tx) => tx.status === 'pending'
  );
  const completedTransactions = transactions.filter(
    (tx) => tx.status === 'completed' || tx.status === 'failed'
  );

  return (
    <TransactionContext.Provider
      value={{
        pendingTransactions,
        completedTransactions,
        addTransaction,
        updateTransactionStatus,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
