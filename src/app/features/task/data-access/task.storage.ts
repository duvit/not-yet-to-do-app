import { Injectable } from '@angular/core';
import { Task } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksPersistence {
  private readonly storageKey = 'ny-tasks';

  public getTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
  }

  public putTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
