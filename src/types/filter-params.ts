import type { CashFlowDirection } from './cash-flow';

export interface FilterParams {
  transactionNo?: string | null;
  cashFlowDirection?: CashFlowDirection | null;
  fromDate?: string | null;
  toDate?: string | null;
  amountAbove?: number | null;
  amountBelow?: number | null;
  balanceAbove?: number | null;
  balanceBelow?: number | null;
}

export interface SortParams {
  by: string;
  direction: 'ASC' | 'DESC';
}

export interface PaginationParams {
  pageNo: number;
  pageSize: number;
}
