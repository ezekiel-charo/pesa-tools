import type { CashFlowDirection } from './cash-flow';
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
  cashFlowDirection: CashFlowDirection;
  balance: number;
}
