import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { formatDate } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { getFilteredTransactions } from '../core/query';
import { copyToClipboard, formatNumber } from '../core/utils';
import type {
  FilterParams,
  PaginationParams,
  SortParams,
} from '../types/filter-params';

interface TransactionsListProps {
  filters: FilterParams;
  sort: SortParams;
  search?: string;
  pagination: PaginationParams;
}

export default function TransactionsList({
  filters,
  sort,
  pagination,
  search,
}: TransactionsListProps) {
  const transactions = useLiveQuery(async () => {
    const pageIndex = pagination.pageNo - 1;
    const filtered = getFilteredTransactions(filters, sort, search);
    return filtered
      .offset(pageIndex * pagination.pageSize)
      .limit(pagination.pageSize)
      .toArray();
  }, [filters, sort, pagination, search]);

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
            {formatNumber(transaction.amount)}
          </td>
          <td className="text-end! font-semibold">
            {formatNumber(transaction.balance)}
          </td>
        </tr>
      ))}
    </>
  );
}
