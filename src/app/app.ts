import { Component, signal } from '@angular/core';
import { TasksList } from './features/task/ui/tasks-list/tasks-list';
import { Header } from './core/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, TasksList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('to-do-app');
}
