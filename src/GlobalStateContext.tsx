import { createContext, useState, type ReactNode } from 'react';
import type { Transaction } from './types/transaction';

interface GlobalState {
  transactions: Transaction[] | null;
  setTransactions: (t: Transaction[]) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalStateContext = createContext<GlobalState>({
  transactions: null,
  setTransactions: () => undefined,
});

interface GlobalStateProviderProps {
  children?: ReactNode;
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  return (
    <GlobalStateContext value={{ transactions, setTransactions }}>
      {children}
    </GlobalStateContext>
  );
}
