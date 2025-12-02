import { WritableSignal } from '@angular/core';
import { TASK_STATUS } from '../../../shared/models/task-status.enum';
import { TASK_PRIORITY } from '../../../shared/models/task-priority.enum';

export interface TaskSignal {
  id: string;
  title: WritableSignal<string>;
  description: WritableSignal<string | null>;
  status: WritableSignal<TASK_STATUS>;
  priority: WritableSignal<TASK_PRIORITY>;
  createdAt: string;
  dueDate: WritableSignal<string | null>;
  doneAt: WritableSignal<string | null>;
  isDone: WritableSignal<boolean>;
}
