import { useState } from 'react';
import { DEFUALT_SORTING } from '../core/constants';
import type { SortDirection, SortParams } from '../types/filter-params';

interface SortDropdownProps {
  applySort: (sort: SortParams) => void;
}

const sortableColumns = [
  { columnName: 'Transaction No.', value: 'transactionNo' },
  { columnName: 'Date', value: 'completionTime' },
  { columnName: 'Amount', value: 'amount' },
  { columnName: 'Balance', value: 'balance' },
];

export default function SortDropdown({ applySort }: SortDropdownProps) {
  const [sort, setSort] = useState<SortParams>(DEFUALT_SORTING);

  return (
    <>
      <div className="w-60 p-4 text-sm">
        <h3 className="font-bold mb-3 text-base">Sort</h3>
        <div className="mb-3">
          <label htmlFor="column" className="block mb-1">
            Column
          </label>
          <select
            onChange={(e) => setSort((s) => ({ ...s, by: e.target.value }))}
            value={sort.by}
            id="column"
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
          >
            {sortableColumns.map((column) => (
              <option key={column.value} value={column.value}>
                {column.columnName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="direction" className="block mb-1">
            Direction
          </label>
          <select
            onChange={(e) =>
              setSort((s) => ({
                ...s,
                direction: e.target.value as SortDirection,
              }))
            }
            value={sort.direction}
            id="direction"
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="text-end">
          <button
            onClick={() => applySort(sort)}
            className="inline-flex items-center gap-1 bg-primary text-sm text-white py-2 px-4 rounded-lg font-medium cursor-pointer"
          >
            Sort
          </button>
        </div>
      </div>
    </>
  );
}
