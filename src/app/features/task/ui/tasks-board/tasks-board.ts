import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TaskColumnMobile } from './ui/mobile/task-column-mobile';
import { TaskColumnDesktop } from './ui/desktop/task-column-desktop';
import { TasksColumnConfig } from '../../../../shared/models/task-cloumn-config.model';
import { ColumnConfigurator } from './utils/column-config';

@Component({
  selector: 'app-tasks-board',
  imports: [TaskColumnMobile, TaskColumnDesktop],
  templateUrl: './tasks-board.html',
  styleUrl: './tasks-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksBoard {
  private columnConfig = inject(ColumnConfigurator)

  public tasksColumnConfig: TasksColumnConfig[] = this.columnConfig.columnConfigs()

  public isMobile = signal(false);

  constructor() {
    this.isMobile.set(window.innerWidth < 768);

    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }
}
