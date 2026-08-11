interface MpesaTransaction {
  id: string;
  transactionNo: string;
  completionTime: string;
  details: string;
  transactionStatus: string;
  paidIn: number | null;
  withdrawn: number | null;
  balance: number;
}

export type { MpesaTransaction };
