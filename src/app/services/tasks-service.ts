import { Injectable, signal } from '@angular/core';
import { TaskSignal, TASK_STATUS, Task, PRIORITY } from '../models/task.model';
import { TaskFormModel } from '../models/task-form.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public readonly tasksPriorities: PRIORITY[] = Object.values(PRIORITY);

  public getavailableStatuses(taskStatus: TASK_STATUS) {
    return this.tasksStatuses.filter((status) => status !== taskStatus);
  }

  public getavailablePriorities(taskPriority: PRIORITY) {
    return this.tasksPriorities.filter((priority) => priority !== taskPriority);
  }

  public createTaskSignal(task: Task): TaskSignal {
    return {
      id: task.id,
      title: signal<string>(task.title),
      description: signal(task.description),
      status: signal(task.status),
      createdAt: task.createdAt,
      updatedAt: signal(task.updatedAt ?? ''),
      doneAt: signal(task.doneAt ?? ''),
      priority: signal(task.priority),
      isDone: signal(task.isDone),
    };
  }

  public taskFromSignal(task: TaskSignal): Task {
    return {
      id: task.id,
      title: task.title(),
      description: task.description(),
      status: task.status(),
      priority: task.priority(),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt() ?? '',
      doneAt: task.doneAt() ?? '',
      isDone: task.isDone(),
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
      updatedAt: signal(''),
      doneAt: signal(''),
      isDone: signal(false),
    };
  }

  public formatDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
