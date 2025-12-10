import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SortOption } from './sort-options.interface';
import { TasksStore } from '../../../features/task/store/tasks.store';
import { SortBy, SortDirection } from './sort-enums.const';
import { TASK_STATUS } from '../../../shared/models/task-status.enum';
import { TaskSignal } from '../../../features/task/data-access/task-signal.model';
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
    const sort = this.sortValue();
    const direction = this.sortDirectionValue();

    if (!sort || !direction) return tasks;

    const factor = direction === SortDirection.ASC ? 1 : -1;

    tasks.sort((a, b) => {
      const A = a.priority();
      const B = b.priority();

      if (sort === 'priority') {
        const orderA = PRIORITY_ORDER[A];
        const orderB = PRIORITY_ORDER[B];

        if (orderA > orderB) return -1 * factor;
        if (orderA < orderB) return 1 * factor;
        return 0;
      }

      if (A < B) return -1 * factor;
      if (A > B) return 1 * factor;
      return 0;
    });

    return tasks;
  });

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
