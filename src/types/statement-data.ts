import type { CashFlowSummary } from './cash-flow';
import type { MpesaTransaction } from './mpesa-transaction';

export interface StatementData {
  transactions: MpesaTransaction[];
  summary: CashFlowSummary;
}
