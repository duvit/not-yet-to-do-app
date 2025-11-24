import { TASK_STATUS } from './task-status.enum';

export const TASK_STATUS_DEFINITIONS = [
  {
    status: TASK_STATUS.TODO,
    title: 'To do',
    emptyMessage: 'Start with something small. Start a list.',
  },
  {
    status: TASK_STATUS.IN_PROGRESS,
    title: 'In progress',
    emptyMessage: 'No tasks are completed. You can get started.',
  },
  {
    status: TASK_STATUS.DONE,
    title: 'Done',
    emptyMessage: 'Nothing has been finished yet — everything is still ahead.',
  },
] as const;
