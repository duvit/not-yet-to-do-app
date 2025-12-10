import { SortBy, SortDirection } from './sort-enums.const';

export interface SortOption {
  label: string;
  value: SortBy;
  direction: SortDirection;
}
