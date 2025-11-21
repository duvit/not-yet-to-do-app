import { Injectable } from '@angular/core';
import { TASK_PRIORITY, TASK_STATUS } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksConstants {
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public readonly tasksPriorities: TASK_PRIORITY[] = Object.values(TASK_PRIORITY);

  public getavailableStatuses(taskStatus: TASK_STATUS) {
    return this.tasksStatuses.filter((status) => status !== taskStatus);
  }

  public getavailablePriorities(taskPriority: TASK_PRIORITY) {
    return this.tasksPriorities.filter((priority) => priority !== taskPriority);
  }
}
