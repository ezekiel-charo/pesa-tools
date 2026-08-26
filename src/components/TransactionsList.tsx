import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { formatDate } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../core/db';
import { copyToClipboard, formatCurreny } from '../core/utils';

interface TransactionsListProps {
  filter: {
    transactionNo?: string | null;
    cashFlowDirection?: 'PAID_IN' | 'PAID_OUT' | null;
    fromDate?: string | null;
    toDate?: string | null;
    amountAbove?: number | null;
    amountBelow?: number | null;
    balanceAbove?: number | null;
    balanceBelow?: number | null;
  };
  sort: { by: string; direction: 'ASC' | 'DESC' };
  search?: string;
  paginator: { pageIndex: number; pageSize: number };
}

export default function TransactionsList({
  filter,
  sort,
  search,
  paginator,
}: TransactionsListProps) {
  const transactions = useLiveQuery(async () => {
    const normalizedSearch = search?.toLocaleLowerCase().trim();
    const fromDate = filter.fromDate ? Date.parse(filter.fromDate) : undefined;
    const toDate = filter.toDate ? Date.parse(filter.toDate) : undefined;

    const filtered = db.mpesaTransactions
      .orderBy(sort.by)
      .filter((txn) => {
        if (
          normalizedSearch &&
          !`${txn.transactionNo}${txn.details}`
            .toLocaleLowerCase()
            .includes(normalizedSearch)
        ) {
          return false;
        }

        if (
          filter.cashFlowDirection != null &&
          txn.cashFlowDirection !== filter.cashFlowDirection
        ) {
          return false;
        }

        if (
          filter.transactionNo != null &&
          txn.transactionNo !== filter.transactionNo
        ) {
          return false;
        }

        if (fromDate != null && txn.completionTime <= fromDate) {
          return false;
        }

        if (toDate != null && txn.completionTime >= toDate) {
          return false;
        }

        if (filter.amountAbove != null && txn.amount <= filter.amountAbove) {
          return false;
        }

        if (filter.amountBelow != null && txn.amount >= filter.amountBelow) {
          return false;
        }

        if (filter.balanceAbove != null && txn.balance <= filter.balanceAbove) {
          return false;
        }

        if (filter.balanceBelow != null && txn.balance >= filter.balanceBelow) {
          return false;
        }

        return true;
      })
      .offset(paginator.pageIndex * paginator.pageSize)
      .limit(paginator.pageSize);

    if (sort.direction === 'DESC') {
      return filtered.reverse().toArray();
    }

    return filtered.toArray();
  }, [filter, sort, search, paginator]);

  return (
    <>
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
            {formatDate(transaction.completionTime, 'd LLL yyy')}
            <span className="ms-2 text-xs font-medium text-gray-400">
              {formatDate(transaction.completionTime, 'h:mm aa')}
            </span>
          </td>
          <td
            className="max-w-70 text-nowrap overflow-hidden text-ellipsis"
            title={transaction.details}
          >
            {transaction.details}
          </td>
          <td
            className={
              (transaction.cashFlowDirection === 'PAID_IN'
                ? 'text-green-700'
                : 'text-red-700') + ' text-end! font-semibold'
            }
          >
            {(transaction.cashFlowDirection === 'PAID_IN' ? '+ ' : '- ') +
              formatCurreny(transaction.amount)}
          </td>
          <td className="text-end! font-semibold">
            {formatCurreny(transaction.balance)}
          </td>
        </tr>
      ))}
    </>
  );
}
