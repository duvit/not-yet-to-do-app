import { Signal } from "@angular/core";
import { TaskSignal } from "../../features/task/data-access/task-signal.model";

export interface TasksColumnConfig {
  title: string;
  listName: string;
  tasksList: Signal<TaskSignal[]>;
  emptyMessage: string;
}
