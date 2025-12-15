import { SortBy, SortDirection } from './sort-enums.const';
import { SortOption } from './sort-options.interface';

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Today',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'This Week',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.DESC,
  },
  {
    label: 'Overdue',
    value: SortBy.DUE_DATE,
    direction: SortDirection.ASC,
  },
];
