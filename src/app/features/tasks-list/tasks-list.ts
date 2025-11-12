import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Task, TASK_STATUS } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import { TasksService } from '../../services/tasks-service';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard, TaskForm, MatTabsModule],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  private tasksService = inject(TasksService);

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
