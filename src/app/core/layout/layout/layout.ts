import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TasksBoard } from '../../../features/task/ui/tasks-board/tasks-board';
import { FiltersMenu } from '../../../features/task/filters-menu/filters-menu';

@Component({
  selector: 'app-layout',
  imports: [Header, TasksBoard, FiltersMenu],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
