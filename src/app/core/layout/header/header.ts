import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialog } from '../../../features/task/ui/tasks-board/ui/dialog/task-dialog';
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
    this.dialog.open(TaskDialog, {
      minWidth: '40vw',
      minHeight: '20vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
