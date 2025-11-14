import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../features/tasks-list/tasks-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      minWidth: '80vw',
      minHeight: '20vh',
      position: { top: '50%', bottom: '50%' },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
