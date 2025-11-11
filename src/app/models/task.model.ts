export enum TASK_STATUS {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TASK_STATUS.TODO | TASK_STATUS.IN_PROGRESS | TASK_STATUS.DONE;
}
