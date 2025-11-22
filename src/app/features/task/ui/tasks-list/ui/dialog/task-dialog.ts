import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskForm } from '../../../task-form/task-form';

@Component({
  selector: 'dialog-animations-example-dialog',
  styles: `
.cancel-btn {
  width: 100%;
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #000000ff;
  background: linear-gradient(135deg, #ff0000cb, #b80606e3);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(170, 0, 255, 0.25);
}

.cancel-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #b000f2, #7b00cc);
  box-shadow: 0 4px 10px rgba(155, 0, 255, 0.3);
  transform: translateY(-2px);
}

.cancel-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(155, 0, 255, 0.2);
}

.cancel-btn:disabled {
  background: #e1c4ff;
  color: #a17abf;
  cursor: not-allowed;
  box-shadow: none;
}`,
  templateUrl: 'task-dialog.html',
  imports: [
    MatButtonModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    TaskForm,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialog {
  readonly dialogRef = inject(MatDialogRef<TaskDialog>);

  onFormSubmit(data: any): void {
    this.dialogRef.close(data);
  }
}
