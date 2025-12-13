import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SortOption } from './sort-options.interface';
import { TasksStore } from '../../store/tasks.store';
import { SortBy, SortDirection } from './sort-enums.const';
import { TASK_STATUS } from '../../../../shared/models/task-status.enum';
import { TaskSignal } from '../../data-access/task-signal.model';
import { PRIORITY_ORDER } from './priority-order.const';

@Injectable({
  providedIn: 'root',
})
export class TasksFilters {
  private tasksStore = inject(TasksStore);
  public tasks = computed(() => this.tasksStore.tasksList());
  private sortValue = signal<SortBy | null>(null);
  private sortDirectionValue = signal<SortDirection | null>(null);

  public apllySorting(value: SortOption['value'], direction: SortOption['direction']) {
    this.sortValue.set(value);
    this.sortDirectionValue.set(direction);
  }

  public filteredAndSortedTasks = computed(() => {
    let tasks = [...this.tasks()];
    const field = this.sortValue();
    const direction = this.sortDirectionValue();

    if (!field || !direction) return tasks;

    const factor = direction === SortDirection.ASC ? 1 : -1;

    return tasks.sort((a, b) => {
      const A = this.getSortableValue(a, field) ?? 0;
      const B = this.getSortableValue(b, field) ?? 0;

      if (A < B) return -1 * factor;
      if (A > B) return 1 * factor;
      return 0;
    });
  });

  public getSortableValue(task: TaskSignal, taskField: keyof TaskSignal) {
    let field = task[taskField];
    let fieldValue: string | boolean | null;

    if (typeof field === 'function') {
      fieldValue = field();
    } else {
      fieldValue = field;
    }

    if (fieldValue === 'priority') {
      return PRIORITY_ORDER[fieldValue];
    }

    if (fieldValue === 'createdAt') {
      return fieldValue ? Date.parse(fieldValue) : 0;
    }

    return fieldValue;
  }

  public toDoTasks = computed(() =>
    this.filteredAndSortedTasks().filter((task) => task.status() === TASK_STATUS.TODO)
  );

  public inProgressTasks = computed(() =>
    this.filteredAndSortedTasks().filter((task) => task.status() === TASK_STATUS.IN_PROGRESS)
  );

  public doneTasks = computed(() =>
    this.filteredAndSortedTasks().filter((task) => task.status() === TASK_STATUS.DONE)
  );
}
