export interface Transaction {
  transactionNo: string;
  completionTime: string;
  details: string;
  transactionStatus: string;
  paidIn: number | null;
  withdrawn: number | null;
  balance: number;
}
