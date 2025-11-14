export enum TASK_STATUS {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export enum PRIORITY {
  SOMEDAY = 'someday',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TASK_STATUS;
  tags?: string[];
  priority: PRIORITY;
  category?: string;
}
