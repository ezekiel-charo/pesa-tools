import { useState } from 'react';
import type { FilterParams } from '../types/filter-params';
import type { CashFlowDirection } from '../types/cash-flow';

interface FiltersDropdownProps {
  applyFilters: (filters: FilterParams) => void;
}

export default function FiltersDropdown({
  applyFilters,
}: FiltersDropdownProps) {
  const [filters, setFilters] = useState<FilterParams>({});

  return (
    <>
      <div className="w-80 p-4">
        <h3 className="font-bold mb-3 text-base">Filter</h3>
        <div className="mb-3">
          <label htmlFor="transaction-no" className="block mb-1">
            Transaction No.
          </label>
          <input
            id="transaction-no"
            type="text"
            placeholder="Enter transaction no."
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
            onChange={(e) =>
              setFilters((f) => ({ ...f, transactionNo: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direction" className="block mb-1">
            Paid In/Out
          </label>
          <select
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                cashFlowDirection: e.target.value as CashFlowDirection,
              }))
            }
            id="direction"
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
          >
            <option value="">Both</option>
            <option value="PAID_IN">Paid In</option>
            <option value="PAID_OUT">Paid Out</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3">
            <label htmlFor="transaction-no" className="block mb-1">
              From
            </label>
            <input
              id="from-date"
              type="date"
              className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
              onChange={(e) =>
                setFilters((f) => ({ ...f, fromDate: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transaction-no" className="block mb-1">
              To
            </label>
            <input
              id="to-date"
              type="date"
              className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
              onChange={(e) =>
                setFilters((f) => ({ ...f, toDate: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="amount-above" className="block mb-1">
            Amount Above
          </label>
          <input
            id="amount-above"
            type="number"
            placeholder="Enter amount"
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                amountAbove: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount-above" className="block mb-1">
            Amount Below
          </label>
          <input
            id="amount-below"
            type="number"
            placeholder="Enter amount"
            className="w-full bg-white border border-gray-300 outline-green-600 rounded-lg py-2 px-4"
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                amountBelow: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div className="text-end">
          <button
            onClick={() => applyFilters({})}
            className="me-4 inline-flex items-center gap-1 border border-gray-300 text-sm text-primary py-2 px-4 rounded-lg font-medium cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => applyFilters(filters)}
            className="inline-flex items-center gap-1 bg-primary text-sm text-white py-2 px-4 rounded-lg font-medium cursor-pointer"
          >
            Filter
          </button>
        </div>
      </div>
    </>
  );
}
