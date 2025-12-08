import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SortOption } from './sort-options.interface';
import { TaskSignal } from '../../../features/task/data-access/task-signal.model';
import { TasksStore } from '../../../features/task/store/tasks.store';

@Injectable({
  providedIn: 'root',
})
export class TasksFilters {
  private tasksStore = inject(TasksStore);
  public tasks = signal(this.tasksStore.tasksList());
  private sortValue = signal<SortOption['value']>(null);
  private sortDirectionValue = signal<SortOption['direction']>(null);

  public apllySorting(value: SortOption['value'], direction: SortOption['direction']) {
    this.sortValue.set(value);
    this.sortDirectionValue.set(direction);
  }

  public filteredAndSortedTasks = computed(() => {
    let tasks = [...this.tasks()];

    if (this.sortValue()) {
      tasks.sort((a, b) => {
        return a[this.sortValue() as keyof TaskSignal] - b[this.sortValue() as keyof TaskSignal];
      });
    }

    if (this.sortDirectionValue()) {
    }
  });
}
