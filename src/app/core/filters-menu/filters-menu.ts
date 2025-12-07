import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-filters-menu',
  imports: [],
  templateUrl: './filters-menu.html',
  styleUrl: './filters-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersMenu {}
