import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TaskCard } from '../../../task-card/task-card';
import { TasksColumnConfig } from '../../../../../../shared/models/task-cloumn-config.model';
import { TaskDndService } from './task-dnd.service';
import { TaskSignal } from '../../../../data-access/task-signal.model';

@Component({
  selector: 'app-task-column-desktop',
  imports: [TaskCard, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './task-column-desktop.html',
  styleUrl: './task-column-desktop.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'task-board-page kanban-page' },
})
export class TaskColumnDesktop {
  private dnd = inject(TaskDndService);
  public readonly config = input.required<TasksColumnConfig[]>();

  public onDrop(event: CdkDragDrop<TaskSignal[]>) {
    this.dnd.drop(event);
  }
}
