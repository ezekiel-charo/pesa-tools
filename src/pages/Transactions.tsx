import {
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { Dropdown } from '../components/DropDown';
import FiltersDropdown from '../components/FiltersDropdown';
import Paginator from '../components/Paginator';
import SortDropdown from '../components/SortDropdown';
import TransactionsList from '../components/TransactionsList';
import { DEFAULT_PAGINATION, DEFUALT_SORTING } from '../core/constants';
import { getFilteredTransactions } from '../core/query';
import { exportToXlsx } from '../core/utils';
import type { FilterParams } from '../types/filter-params';

export default function Transactions() {
  const [search, setSearch] = useState<string>();
  const [filters, setFilters] = useState<FilterParams>({});
  const [sort, setSort] = useState(DEFUALT_SORTING);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [sortDropdownOpened, setSortDropdownOpened] = useState(false);
  const [filtersDropdownOpened, setFiltersDropdownOpened] = useState(false);

  const exportTransactions = async () => {
    const transactions = await getFilteredTransactions(
      filters,
      sort,
      search
    ).toArray();

    exportToXlsx(transactions);
  };

  const totalItems = useLiveQuery(() => {
    return getFilteredTransactions(filters, sort, search).count();
  }, [filters, sort, search]);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <input
          type="search"
          placeholder="Search transaction number or details..."
          className="w-80 bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Dropdown
            opened={filtersDropdownOpened}
            onClose={() => setFiltersDropdownOpened(false)}
            content={
              <FiltersDropdown
                applyFilters={(f) => {
                  setFilters(f);
                  setFiltersDropdownOpened(false);
                }}
              />
            }
          >
            <button
              onClick={() => setFiltersDropdownOpened(true)}
              className="inline-flex items-center gap-1 border border-gray-300 text-sm text-primary py-2 px-4 rounded-lg font-medium cursor-pointer"
            >
              <FunnelIcon className="size-4" /> Filter
            </button>
          </Dropdown>
          <Dropdown
            opened={sortDropdownOpened}
            onClose={() => setSortDropdownOpened(false)}
            content={
              <SortDropdown
                applySort={(s) => {
                  setSort(s);
                  setSortDropdownOpened(false);
                }}
              />
            }
          >
            <button
              onClick={() => setSortDropdownOpened(true)}
              className="inline-flex items-center gap-1 border border-gray-300 text-sm text-primary py-2 px-4 rounded-lg font-medium cursor-pointer"
            >
              <ChevronUpDownIcon className="size-4" /> Sort
            </button>
          </Dropdown>
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
        <Paginator
          pageNo={pagination.pageNo}
          pageSize={pagination.pageSize}
          totalItems={totalItems}
          onPageChange={setPagination}
        />
      </div>
    </>
  );
}
