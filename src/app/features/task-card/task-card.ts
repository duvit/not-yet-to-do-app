import { Component, inject, input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnInit {
  public task = input.required<Task>();
  private tasksService = inject(TasksService);
  public taskId: string = '';

  ngOnInit() {
    this.taskId = this.task().id;
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask(taskId);
    // this.tasksService.loadTasks();
  }
}
