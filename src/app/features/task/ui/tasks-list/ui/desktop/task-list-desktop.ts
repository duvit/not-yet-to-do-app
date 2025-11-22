import { Component, inject, input } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskSignal } from '../../../../data-access/task-signal.model';
import { TASK_STATUS } from '../../../../../../shared/models/task-status.enum';
import { TaskCard } from '../../../task-card/task-card';
import { TasksStore } from '../../../../store/tasks.store';
import { TasksGroup } from '../../../../../../shared/models/task-group.model';

@Component({
  selector: 'app-task-list-desktop',
  imports: [TaskCard, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './task-list-desktop.html',
  styleUrl: './task-list-desktop.scss',
})
export class TaskListDesktop {
  private tasksStore = inject(TasksStore);
  public readonly tasks = input.required<TasksGroup>();

  drop(event: CdkDragDrop<TaskSignal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const listElement = event.container.element.nativeElement;
      const listName = listElement.getAttribute('list-name');
      this.changeDropeStatus(event.item.data, listName as string);
    }
  }

  changeDropeStatus(taskId: string, listStatus: string) {
    const newStatus = listStatus;
    this.tasksStore.changeTaskStatus(taskId, newStatus as TASK_STATUS);
  }
}
