import {
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import TransactionsList from '../components/TransactionsList';
import { exportToXlsx } from '../core/utils';
import type {
  FilterParams,
  PaginationParams,
  SortParams,
} from '../types/filter-params';
import { getFilteredTransactions } from '../core/query';

const DEFUALT_SORTING: SortParams = { by: 'completionTime', direction: 'DESC' };
const DEFAULT_PAGINATION: PaginationParams = { pageNo: 1, pageSize: 10 };

export default function Transactions() {
  const [search, setSearch] = useState<string>();
  const [filters, setFilters] = useState<FilterParams>({});
  const [sort, setSort] = useState(DEFUALT_SORTING);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const exportTransactions = async () => {
    const transactions = await getFilteredTransactions(
      filters,
      sort,
      pagination,
      search
    ).toArray();

    exportToXlsx(transactions);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <input
          type="search"
          placeholder="Search names, transaction number, etc."
          className="w-80 bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 border border-gray-300 text-sm text-primary py-2 px-4 rounded-lg font-medium cursor-pointer">
            <FunnelIcon className="size-4" /> Filter
          </button>
          <button className="inline-flex items-center gap-1 border border-gray-300 text-sm text-primary py-2 px-4 rounded-lg font-medium cursor-pointer">
            <ChevronUpDownIcon className="size-4" /> Sort
          </button>
          <button
            onClick={exportTransactions}
            className="inline-flex items-center gap-1 bg-primary text-sm text-white py-2 px-4 rounded-lg font-medium cursor-pointer"
          >
            <ArrowDownTrayIcon className="size-4" /> Export
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-[#cdd2d5] overflow-hidden">
        <table className="w-full text-[#646566]">
          <thead>
            <tr className="text-xs text-black [&_th]:semibold [&_th]:text-start [&_th]:p-4 [&_th]:bg-[#f5f9fa] [&_th]:border-r-2 [&_th]:last:border-r-0 [&_th]:border-[#feffff]">
              <th>TRANSACTION NO.</th>
              <th>DATE</th>
              <th>DETAILS</th>
              <th>AMOUNT</th>
              <th>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            <TransactionsList
              filters={filters}
              sort={sort}
              pagination={pagination}
              search={search}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}
