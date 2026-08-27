import type { PaginationParams, SortParams } from '../types/filter-params';

export const DEFUALT_SORTING: SortParams = {
  by: 'completionTime',
  direction: 'DESC',
};

export const DEFAULT_PAGINATION: PaginationParams = { pageNo: 1, pageSize: 10 };
