import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Task, TASK_STATUS } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import { TasksService } from '../../services/tasks-service';
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

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard, MatTabsModule, NgTemplateOutlet],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  private tasksService = inject(TasksService);
  private breakpointObserver = inject(BreakpointObserver);
  public isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)').pipe(map((state) => state.matches)),
    {
      initialValue: window.innerWidth < 768,
    }
  );

  constructor() {
    this.tasksService.reloadTasks();
  }

  public get toDoTasks(): Task[] {
    return this.tasksService.tasksList().filter((task) => task.status === TASK_STATUS.TODO);
  }

  public get inProgressTasks(): Task[] {
    return this.tasksService.tasksList().filter((task) => task.status === TASK_STATUS.IN_PROGRESS);
  }

  public get doneTasks(): Task[] {
    return this.tasksService.tasksList().filter((task) => task.status === TASK_STATUS.DONE);
  }

  addTask(task: Task) {
    this.tasksService.addTask(task);
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
