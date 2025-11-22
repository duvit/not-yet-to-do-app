import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TasksStore } from '../../store/tasks.store';
import { TaskListMobile } from './ui/mobile/task-list-mobile';
import { TaskListDesktop } from './ui/desktop/task-list-desktop';
import { TasksGroup } from '../../../../shared/models/task-group.model';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskListMobile, TaskListDesktop],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksList {
  private tasksStore = inject(TasksStore);

  public tasks: TasksGroup = {
    toDoTasks: this.tasksStore.toDoTasks,
    inProgressTasks: this.tasksStore.inProgressTasks,
    doneTasks: this.tasksStore.doneTasks,
  };

  public isMobile = signal(false);

  constructor() {
    this.isMobile.set(window.innerWidth < 768);

    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }
}
