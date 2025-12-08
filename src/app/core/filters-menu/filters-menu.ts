import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SORT_OPTIONS } from './utils/sort-config';

@Component({
  selector: 'app-filters-menu',
  imports: [],
  templateUrl: './filters-menu.html',
  styleUrl: './filters-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersMenu {
  public sortOptions = SORT_OPTIONS;
  public isSortOpen = signal(false);

  public openSort() {
    this.isSortOpen.update(() => !this.isSortOpen());
  }
}
