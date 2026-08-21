import type { MpesaTransactionType } from './mpesa-transaction-type';

export interface MpesaTransaction {
  id: number;
  transactionNo: string;
  transactionType: MpesaTransactionType;
  completionTime: number;
  details: string;
  isCharge: boolean;
  transactionStatus: string;
  paidIn: number | null;
  withdrawn: number | null;
  balance: number;
  counterPartyNumber?: string;
}

export type MpesaBalance = Pick<
  MpesaTransaction,
  'transactionNo' | 'completionTime' | 'balance'
>;
