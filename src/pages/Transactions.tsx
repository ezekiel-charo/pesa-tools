import { formatDate } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../core/db';
import { copyToClipboard, formatCurreny } from '../core/utils';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';

export default function Transactions() {
  const transactions = useLiveQuery(() => {
    return db.mpesaTransactions.toArray();
  });

  return (
    <>
      <div className="rounded-lg border border-[#cdd2d5] overflow-hidden">
        <table className="w-full text-[#646566]">
          <thead>
            <tr className="text-xs text-black [&_th]:semibold [&_th]:text-start [&_th]:p-4 [&_th]:bg-[#f5f9fa] [&_th]:border-r-2 [&_th]:border-[#feffff]">
              <th>TRANSACTION NO.</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 text-sm [&_td]:semibold [&_td]:text-start [&_td]:py-3 [&_td]:px-4 [&_td]:bg-white [&_td]:border-r-2 [&_td]:border-[#feffff]"
              >
                <td className="font-semibold">
                  {transaction.transactionNo}
                  <button
                    onClick={() => copyToClipboard(transaction.transactionNo)}
                    className="ms-2 cursor-pointer"
                  >
                    <DocumentDuplicateIcon className="size-4" />
                  </button>
                </td>
                <td>
                  {formatDate(transaction.completionTime, 'dd/MM/yyy')}
                  <span className="ms-2 text-xs font-medium text-gray-400">
                    {formatDate(transaction.completionTime, 'h:mm aa')}
                  </span>
                </td>
                <td
                  className={
                    (transaction.paidIn ? 'text-green-700' : 'text-red-700') +
                    ' text-end! font-semibold'
                  }
                >
                  {(transaction.paidIn ? '+ ' : '- ') +
                    formatCurreny(transaction.paidIn || transaction.withdrawn)}
                </td>
                <td className="text-end! font-semibold">
                  {formatCurreny(transaction.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
