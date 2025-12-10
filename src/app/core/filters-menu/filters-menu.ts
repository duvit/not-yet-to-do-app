import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SORT_OPTIONS } from './utils/sort-config.const';
import { TasksFilters } from './utils/tasks-filters.service';
import { SortBy, SortDirection } from './utils/sort-enums.const';

@Component({
  selector: 'app-filters-menu',
  imports: [],
  templateUrl: './filters-menu.html',
  styleUrl: './filters-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersMenu {
  private filtersService = inject(TasksFilters);
  public sortOptions = SORT_OPTIONS;
  public isSortOpen = signal(false);

  public openSort() {
    this.isSortOpen.update(() => !this.isSortOpen());
  }

  public onSort(value: SortBy, direction: SortDirection) {
    this.filtersService.apllySorting(value, direction);
  }
}
