import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskCard } from '../task-card/task-card';
import { TaskForm } from '../task-form/task-form';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TasksStore } from '../../store/tasks.store';
import { TaskSignal } from '../../data-access/task-signal.model';
import { TASK_STATUS } from '../../../../shared/models/task-status.enum';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard, MatTabsModule, NgTemplateOutlet],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksList {
  private tasksStore = inject(TasksStore);
  private breakpointObserver = inject(BreakpointObserver);
  public toDoTasks = this.tasksStore.toDoTasks;
  public inProgressTasks = this.tasksStore.inProgressTasks;
  public doneTasks = this.tasksStore.doneTasks;
  public isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)').pipe(map((state) => state.matches)),
    {
      initialValue: window.innerWidth < 768,
    }
  );

  ngOnInit() {}

  addTask(task: TaskSignal) {
    this.tasksStore.addTask(task);
  }
}

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
  templateUrl: 'dialog-content.html',
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
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);

  onFormSubmit(data: any): void {
    this.dialogRef.close(data);
  }
}
