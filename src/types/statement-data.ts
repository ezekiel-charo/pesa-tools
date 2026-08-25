import type { CashFlowSummary } from './CashFlowSummary';
import type { MpesaTransaction } from './mpesa-transaction';

export interface StatementData {
  transactions: MpesaTransaction[];
  summary: CashFlowSummary | null;
}
