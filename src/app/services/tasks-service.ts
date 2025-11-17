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
    console.log(this.tasksList());
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

  public updateTask(taskId: string) {
    this.tasksList.update((list) =>
      list.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
          };
        }
        return task;
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
    };
  }

  public updateStatus(task: Task, status: TASK_STATUS): Task {
    return {
      ...task,
      status: status,
    };
  }

  public updateDate(task: Task, dateField: 'updatedAt' | 'doneAt'): Task {
    return {
      ...task,
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
