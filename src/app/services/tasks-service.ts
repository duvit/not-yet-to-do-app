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

  public saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasksList()));
  }

  public reloadTasks(): void {
    this.tasksList.set(this.loadTasks());
  }

  public addTask(task: Task): void {
    this.tasksList.update((list) => [...list, task]);
    this.saveTasks();
  }

  public deleteTask(taskId: string): void {
    this.tasksList.update((list) => list.filter((task) => task.id !== taskId));
    this.saveTasks();
  }

  public taskFromData(taskData: TaskFormModel): Task {
    return {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      status: TASK_STATUS.TODO,
    };
  }
}
