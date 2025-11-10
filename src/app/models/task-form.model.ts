import { PRIORITY } from './task.model';

export interface TaskFormModel {
  title: string;
  description?: string;
  priority: PRIORITY;
}
