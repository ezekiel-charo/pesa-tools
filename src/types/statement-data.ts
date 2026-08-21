import type { CounterParty } from './counter-party';
import type { MpesaTransaction } from './mpesa-transaction';

export interface StatementData {
  transactions: MpesaTransaction[];
  counterParties: CounterParty[];
}
