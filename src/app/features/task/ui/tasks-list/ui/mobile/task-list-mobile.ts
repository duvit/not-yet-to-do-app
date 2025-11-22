import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskCard } from '../../../task-card/task-card';
import { TasksGroup } from '../../../../../../shared/models/task-group.model';

@Component({
  selector: 'app-task-list-mobile',
  imports: [TaskCard, NgTemplateOutlet, MatTabsModule],
  templateUrl: './task-list-mobile.html',
  styleUrl: './task-list-mobile.scss',
})
export class TaskListMobile {
  public readonly tasks = input.required<TasksGroup>();
}
