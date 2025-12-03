import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TasksBoard } from '../../../features/task/ui/tasks-board/tasks-board';
import { FloatingActionBar } from '../floating-action-bar/floating-action-bar';

@Component({
  selector: 'app-layout',
  imports: [Header, TasksBoard, FloatingActionBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
