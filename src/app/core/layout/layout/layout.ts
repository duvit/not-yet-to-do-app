import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TasksBoard } from '../../../features/task/ui/tasks-board/tasks-board';

@Component({
  selector: 'app-layout',
  imports: [Header, TasksBoard],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
