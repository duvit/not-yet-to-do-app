import { SortBy, SortDirection } from './sort-enums.const';
import { SortOption } from './sort-options.interface';

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Created',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'Created',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.DESC,
  },
  {
    label: 'Due',
    value: SortBy.DUE_DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'Due',
    value: SortBy.DUE_DATE,
    direction: SortDirection.DESC,
  },
  {
    label: 'Priority',
    value: SortBy.PRIORITY,
    direction: SortDirection.ASC,
  },
  {
    label: 'Priority',
    value: SortBy.PRIORITY,
    direction: SortDirection.DESC,
  },
];
