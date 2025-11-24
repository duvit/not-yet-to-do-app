import { Component, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskCard } from '../../../task-card/task-card';
import { TasksColumnConfig } from '../../../../../../shared/models/task-cloumn-config.model';

@Component({
  selector: 'app-task-column-mobile',
  imports: [TaskCard, MatTabsModule],
  templateUrl: './task-column-mobile.html',
  styleUrl: './task-column-mobile.scss',
})
export class TaskColumnMobile {
  public readonly config = input.required<TasksColumnConfig[]>();
}
