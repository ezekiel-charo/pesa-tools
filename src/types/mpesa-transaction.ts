import type { MpesaTransactionType } from './mpesa-transaction-type';

export interface MpesaTransaction {
  id: number;
  transactionNo: string;
  transactionType: MpesaTransactionType;
  completionTime: number;
  details: string;
  searchableStr: string;
  isCharge: boolean;
  transactionStatus: string;
  amount: number;
  cashFlowDirection: 'PAID_IN' | 'PAID_OUT';
  balance: number;
}
