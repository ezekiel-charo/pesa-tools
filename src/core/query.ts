import type {
  FilterParams,
  PaginationParams,
  SortParams,
} from '../types/filter-params';
import { db } from './db';

export function getFilteredTransactions(
  filters: FilterParams,
  sort: SortParams,
  pagination: PaginationParams,
  search?: string
) {
  const normalizedSearch = search?.toLocaleLowerCase().trim();
  const fromDate = filters.fromDate ? Date.parse(filters.fromDate) : undefined;
  const toDate = filters.toDate ? Date.parse(filters.toDate) : undefined;
  const pageIndex = pagination.pageNo - 1;

  let filtered = db.mpesaTransactions
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
        filters.cashFlowDirection &&
        filters.cashFlowDirection != null &&
        txn.cashFlowDirection !== filters.cashFlowDirection
      ) {
        return false;
      }

      if (
        filters.transactionNo != null &&
        txn.transactionNo !== filters.transactionNo
      ) {
        return false;
      }

      if (fromDate != null && txn.completionTime <= fromDate) {
        return false;
      }

      if (toDate != null && txn.completionTime >= toDate) {
        return false;
      }

      if (filters.amountAbove != null && txn.amount <= filters.amountAbove) {
        return false;
      }

      if (filters.amountBelow != null && txn.amount >= filters.amountBelow) {
        return false;
      }

      if (filters.balanceAbove != null && txn.balance <= filters.balanceAbove) {
        return false;
      }

      if (filters.balanceBelow != null && txn.balance >= filters.balanceBelow) {
        return false;
      }

      return true;
    })
    .offset(pageIndex * pagination.pageSize);

  if (sort.direction === 'DESC') {
    filtered = filtered.reverse();
  }

  return filtered;
}
