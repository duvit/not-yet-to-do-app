import { Signal } from '@angular/core';
import { TaskSignal } from '../../features/task/data-access/task-signal.model';

export interface TasksGroup {
  toDoTasks: Signal<TaskSignal[]>;
  inProgressTasks: Signal<TaskSignal[]>;
  doneTasks: Signal<TaskSignal[]>;
}
