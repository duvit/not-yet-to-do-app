import { Injectable } from '@angular/core';
import { TASK_STATUS } from '../../shared/models/task-status.enum';
import { TASK_PRIORITY } from '../../shared/models/task-priority.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksConstants {
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public readonly tasksPriorities: TASK_PRIORITY[] = Object.values(TASK_PRIORITY);

  // public getavailableStatuses(taskStatus: TASK_STATUS) {
  //   return this.tasksStatuses.filter((status) => status !== taskStatus);
  // }

  public getavailableStatuses() {
    return this.tasksStatuses;
  }

  public getavailablePriorities(taskPriority: TASK_PRIORITY) {
    return this.tasksPriorities.filter((priority) => priority !== taskPriority);
  }
}
