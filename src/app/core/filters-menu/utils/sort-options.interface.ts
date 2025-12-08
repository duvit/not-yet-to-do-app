import { SortBy, SortDirection } from './sort-enums';

export interface SortOption {
  label: string;
  value: SortBy | null;
  direction: SortDirection | null;
}
