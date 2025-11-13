import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Task, TASK_STATUS } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import { TasksService } from '../../services/tasks-service';
import { TaskForm } from '../task-form/task-form';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard, MatTabsModule, MatButtonModule],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  private tasksService = inject(TasksService);

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

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
  templateUrl: 'dialog-animations-example-dialog.html',
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, TaskForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}
