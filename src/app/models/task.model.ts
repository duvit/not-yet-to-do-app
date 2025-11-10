import { Signal, WritableSignal } from '@angular/core';

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
  description: string | null;
  status: TASK_STATUS;
  // tags: string[] | null;
  priority: PRIORITY;
  createdAt: string;
  updatedAt: string | null;
  doneAt: string | null;
  isDone: boolean;
}

export interface TaskSignal {
  id: string;
  title: WritableSignal<string>;
  description: WritableSignal<string | null>;
  status: WritableSignal<TASK_STATUS>;
  // tags: Signal<string[]>;
  priority: WritableSignal<PRIORITY>;
  createdAt: string;
  updatedAt: WritableSignal<string | null>;
  doneAt: WritableSignal<string | null>;
  isDone: WritableSignal<boolean>;
}
