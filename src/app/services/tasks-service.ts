import { Injectable, signal } from '@angular/core';
import { Task, TASK_STATUS } from '../models/task.model';
import { TaskFormModel } from '../models/task-form.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksList = signal<Task[]>(this.loadTasks());
  private readonly storageKey = 'ny-tasks';

  private loadTasks(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public reloadTasks(): void {
    this.tasksList.set(this.loadTasks());
  }

  public saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasksList()));
    this.reloadTasks();
  }

  public addTask(task: Task): void {
    this.tasksList.update((list) => [...list, task]);
    this.saveTasks();
  }

  public deleteTask(taskId: string): void {
    this.tasksList.update((list) => list.filter((task) => task.id !== taskId));
    this.saveTasks();
  }

  public updateTask(task: Task) {
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
    this.reloadTasks();
  }

  private getTaskById(taskId: string): Task {
    return this.tasksList().find((task) => task.id === taskId)!;
  }

  public taskFromData(taskData: TaskFormModel): Task {
    return {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      status: TASK_STATUS.TODO,
      priority: taskData.priority,
      createdAt: this.formatDate(),
      isDone: false,
    };
  }

  public updateStatus(task: Task, status: TASK_STATUS, dateField: 'updatedAt' | 'doneAt'): Task {
    return {
      ...task,
      status: status,
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
