import { Injectable, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskSignal } from '../../../../data-access/task-signal.model';
import { TasksStore } from '../../../../store/tasks.store';
import { TASK_STATUS } from '../../../../../../shared/models/task-status.enum';

@Injectable({ providedIn: 'root' })
export class TaskDndService {
  private tasksStore = inject(TasksStore);

  public drop(event: CdkDragDrop<TaskSignal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const previousContainer =
        event.previousContainer.element.nativeElement.getAttribute('list-name');
      const newContainer = event.container.element.nativeElement.getAttribute('list-name');
      if (previousContainer === 'done') {
        return;
      } else {
        this.changeDropeStatus(event.item.data, newContainer as string);
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private changeDropeStatus(taskId: string, listStatus: string) {
    const newStatus = listStatus;
    this.tasksStore.changeTaskStatus(taskId, newStatus as TASK_STATUS);
  }
}
