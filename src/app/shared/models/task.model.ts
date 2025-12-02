import { TASK_PRIORITY } from "./task-priority.enum";
import { TASK_STATUS } from "./task-status.enum";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TASK_STATUS;
  priority: TASK_PRIORITY;
  createdAt: string;
  dueDate: string | null;
  doneAt: string | null;
  isDone: boolean;
}

