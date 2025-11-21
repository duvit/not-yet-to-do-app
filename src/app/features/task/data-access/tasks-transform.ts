import { inject, Injectable, signal } from '@angular/core';
import { Task, TASK_STATUS, TaskSignal } from '../../../shared/models/task.model';
import { TaskFormModel } from '../../../shared/models/task-form.model';
import { DateFormat } from '../../../core/utils/date-format.service';

@Injectable({
  providedIn: 'root',
})
export class TaskDomainService {
  private dateFormat = inject(DateFormat);

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

  public createTaskFromForm(taskData: TaskFormModel): TaskSignal {
    return {
      id: crypto.randomUUID(),
      title: signal(taskData.title),
      description: signal(taskData.description ?? null),
      status: signal(TASK_STATUS.TODO),
      priority: signal(taskData.priority),
      createdAt: this.dateFormat.formatDate(),
      updatedAt: signal(''),
      doneAt: signal(''),
      isDone: signal(false),
    };
  }

  public changeStatus(task: TaskSignal | undefined, newStatus: string): void {
    const dateField = newStatus === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';

    if (dateField === 'doneAt') {
      task?.doneAt?.set(this.dateFormat.formatDate());
      task?.isDone?.set(true);
    } else {
      task?.updatedAt.set(this.dateFormat.formatDate());
    }

    task?.status.set(newStatus as TASK_STATUS);
  }
}
