import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialog } from '../../../features/task/ui/tasks-board/ui/dialog/task-dialog';
import { MatButtonModule } from '@angular/material/button';
import { FiltersMenu } from '../../../features/task/filters-menu/filters-menu';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly dialog = inject(MatDialog);

  public isSearchOpen = signal(false);

  public toogleSearch() {
    this.isSearchOpen.set(!this.isSearchOpen());
  }

  openAddTask(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TaskDialog, {
      minWidth: '40vw',
      minHeight: '20vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openFiltersMenu(): void {}

  @ViewChild('searchBar') searchBar!: ElementRef<HTMLTextAreaElement>;

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insideSearch = this.searchBar?.nativeElement.contains(target);
    if (!insideSearch) this.isSearchOpen.set(false);
  }
}
