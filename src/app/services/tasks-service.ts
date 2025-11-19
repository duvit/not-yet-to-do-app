import { Injectable, signal } from '@angular/core';
import { TaskSignal, TASK_STATUS, Task } from '../models/task.model';
import { TaskFormModel } from '../models/task-form.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksList = signal<TaskSignal[]>([]);
  private readonly storageKey = 'ny-tasks';

  public loadTasks() {
    const data: Task[] = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    this.tasksList.set(data.map((t) => this.createTaskSignal(t)));
  }

  constructor() {
    this.loadTasks();
  }

  // public reloadTasks(): void {
  //   this.tasksList.set(this.loadTasks());
  // }

  public saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasksList()));
  }

  public addTask(task: TaskSignal): void {
    this.tasksList.update((list) => [...list, task]);
    this.saveTasks();
  }

  public deleteTask(taskId: string): void {
    this.tasksList.update((list) => list.filter((task) => task.id !== taskId));
    this.saveTasks();
  }

  private createTaskSignal(task: Task): TaskSignal {
    return {
      id: task.id,
      title: signal(task.title),
      description: signal(task.description),
      status: signal(task.status),
      createdAt: task.createdAt,
      updatedAt: signal(task.updatedAt ?? ''),
      doneAt: signal(task.doneAt ?? ''),
      priority: signal(task.priority),
      isDone: signal(task.isDone),
    };
  }

  public taskFromData(taskData: TaskFormModel): TaskSignal {
    return {
      id: crypto.randomUUID(),
      title: signal(taskData.title),
      description: signal(taskData.description ?? null),
      status: signal(TASK_STATUS.TODO),
      priority: signal(taskData.priority),
      createdAt: this.formatDate(),
      isDone: signal(false),
    };
  }

  public updateTask(task: TaskSignal) {
    this.tasksList.update((list) =>
      list.map((t) => {
        if (t.id === task.id) {
          return {
            ...task,
          };
        }
        return t;
      })
    );
    this.saveTasks();
    // this.reloadTasks();
  }

  public updateStatus(
    task: TaskSignal,
    status: TASK_STATUS,
    dateField: 'updatedAt' | 'doneAt'
  ): TaskSignal {
    return {
      ...task,
      [status]: status,
      [dateField]: this.formatDate(),
    };
  }

  private formatDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
