import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SortOption } from './sort-options.interface';
import { TasksStore } from '../../store/tasks.store';
import { SortBy, SortDirection } from './sort-enums.const';
import { TASK_STATUS } from '../../../../shared/models/task-status.enum';
import { TaskSignal } from '../../data-access/task-signal.model';
import { PRIORITY_ORDER } from './priority-order.const';
import { TASK_PRIORITY } from '../../../../shared/models/task-priority.enum';

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

  public getSortableValue(
    task: TaskSignal,
    field: keyof TaskSignal
  ): number | string | boolean | null {
    const raw = task[field];

    const value = typeof raw === 'function' ? raw() : raw;

    if (value == null) return null;

    if (field === 'priority') {
      return PRIORITY_ORDER[value as TASK_PRIORITY];
    }

    if (field === 'createdAt' || field === 'dueDate' || field === 'doneAt') {
      if (!value) return Number.MAX_SAFE_INTEGER;
      return Date.parse(value as string);
    }

    return value;
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
