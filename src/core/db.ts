import { Dexie, type EntityTable } from 'dexie';
import type { MpesaTransaction } from '../types/mpesa-transaction';
import type { CounterParty } from '../types/counter-party';

const db = new Dexie('mpesaTransactionsDb') as Dexie & {
  mpesaTransactions: EntityTable<MpesaTransaction, 'id'>;
  counterParties: EntityTable<CounterParty, 'counterPartyNumber'>;
};

// Schema declaration
db.version(1).stores({
  // TODO: Create multiple "tables" e.g. transactions, people, transactionType etc
  mpesaTransactions:
    '++id, transactionNo, transactionType, completionTime, details, transactionStatus, paidIn, withdrawn, balance, counterPartyNumber, counterPartyName',
  counterParties: '++counterPartyNumber, counterPartyName',
});

export { db };
