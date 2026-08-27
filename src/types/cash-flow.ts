export interface CashFlow {
  paidIn: number;
  paidOut: number;
}

export const CASH_FLOW_TYPES = [
  'sendMoney',
  'receivedMoney',
  'agentDeposit',
  'agentWithdrawal',
  'paybill',
  'buyGoods',
  'others',
  'total',
] as const;

export type CashFlowType = (typeof CASH_FLOW_TYPES)[number];

export type CashFlowSummary = Record<CashFlowType, CashFlow>;

export type CashFlowDirection = 'PAID_IN' | 'PAID_OUT';
