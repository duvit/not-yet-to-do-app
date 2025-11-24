import { inject, Injectable } from '@angular/core';
import { TASK_STATUS_DEFINITIONS } from '../../../../../shared/models/task-cloumn-config';
import { TASK_STATUS } from '../../../../../shared/models/task-status.enum';
import { TasksStore } from '../../../store/tasks.store';

@Injectable({
  providedIn: 'root',
})
export class ColumnConfigurator {
  private tasksStore = inject(TasksStore);

  public columnConfigs() {
    return TASK_STATUS_DEFINITIONS.map((def) => ({
      title: def.title,
      listName: def.status,
      emptyMessage: def.emptyMessage,
      tasksList: this.tasksStore[this.statusToGetter(def.status)],
    }));
  }

  private statusToGetter(status: TASK_STATUS) {
    switch (status) {
      case TASK_STATUS.TODO:
        return 'toDoTasks';
      case TASK_STATUS.IN_PROGRESS:
        return 'inProgressTasks';
      case TASK_STATUS.DONE:
        return 'doneTasks';
    }
  }
}
