import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { PaginationParams } from '../types/filter-params';
import { formatNumber } from '../core/utils';

interface PaginatorProps {
  pageNo: number;
  pageSize: number;
  totalItems?: number;
  onPageChange: (pagination: PaginationParams) => void;
}

export default function Paginator({
  pageNo,
  pageSize,
  totalItems,
  onPageChange,
}: PaginatorProps) {
  const totalPages = Math.ceil((totalItems || 0) / pageSize);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 bg-white font-medium">
        <div className="text-sm">
          <span className="me-1">Total Items:</span>
          {formatNumber(totalItems)}
        </div>
        <div className="flex items-center">
          <div className="text-sm me-5">
            Page {pageNo} of {totalPages}
          </div>
          <button
            onClick={() =>
              onPageChange({ pageNo: pageNo > 1 ? pageNo - 1 : 1, pageSize })
            }
            className="p-2 cursor-pointer me-1"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <button
            onClick={() => {
              onPageChange({
                pageNo: pageNo < totalPages ? pageNo + 1 : totalPages,
                pageSize,
              });
            }}
            className="p-2 cursor-pointer"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </>
  );
}
