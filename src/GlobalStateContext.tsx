import { createContext, useState, type ReactNode } from 'react';
import type { MpesaTransaction } from './types/mpesa-transaction';

interface GlobalState {
  transactions: MpesaTransaction[] | null;
  setTransactions: (t: MpesaTransaction[]) => void;
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
  const [transactions, setTransactions] = useState<MpesaTransaction[] | null>(null);

  return (
    <GlobalStateContext value={{ transactions, setTransactions }}>
      {children}
    </GlobalStateContext>
  );
}
