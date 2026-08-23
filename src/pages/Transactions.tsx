import { formatDate } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../core/db';

export default function Transactions() {
  const transactions = useLiveQuery(() => {
    return db.mpesaTransactions.toArray();
  });

  return (
    <>
      <div className="rounded-lg border border-gray-100">
        <table>
          <thead>
            <tr>
              <th>Transaction No.</th>
              <th>Completion Time</th>
              <th>IN/OUT</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.transactionNo}</td>
                <td>
                  {formatDate(transaction.completionTime, 'dd/MM/yyy HH:mm:ss')}
                </td>
                <td>{transaction.paidIn ? 'IN' : 'OUT'}</td>
                <td>{transaction.paidIn || transaction.withdrawn}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
