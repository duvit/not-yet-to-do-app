import { SortBy, SortDirection } from './sort-enums.const';
import { SortOption } from './sort-options.interface';

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Date: Oldest First',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'Date: Newest First',
    value: SortBy.CREATE_DATE,
    direction: SortDirection.DESC,
  },
  {
    label: 'Date: Coming Soon',
    value: SortBy.DUE_DATE,
    direction: SortDirection.ASC,
  },
  {
    label: 'Date: Coming Late',
    value: SortBy.DUE_DATE,
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
