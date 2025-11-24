import { Component, signal } from '@angular/core';
import { TasksBoard } from './features/task/ui/tasks-board/tasks-board';
import { Header } from './core/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, TasksBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('to-do-app');
}
