import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-filters-menu',
  imports: [MatButtonModule, MatDialogClose, MatDialogActions, MatDialogContent],
  templateUrl: './filters-menu.html',
  styleUrl: './filters-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersMenu {
  readonly dialogRef = inject(MatDialogRef<FiltersMenu>);

  close(): void {
    this.dialogRef.close();
  }
}
