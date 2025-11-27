import { TASK_PRIORITY } from './task-priority.enum';

export interface TaskFormModel {
  title: string;
  description?: string;
  priority: TASK_PRIORITY;
  dueDate?: string
}
