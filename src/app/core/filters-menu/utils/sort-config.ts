import { SortBy, SortDirection } from './sort-enums';
import { SortOption } from './sort-options.interface';

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Date: Oldest First',
    value: SortBy.DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'Date: Newest First',
    value: SortBy.DATE,
    direction: SortDirection.DESC,
  },
  {
    label: 'Priority: Lowest First',
    value: SortBy.PRIORITY,
    direction: SortDirection.ASC,
  },
  {
    label: 'Priority: Highest First',
    value: SortBy.PRIORITY,
    direction: SortDirection.DESC,
  },
];
