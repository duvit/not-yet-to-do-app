import { Component, inject } from '@angular/core';
import { Task } from '../../models/task';
import { TaskCard } from '../task-card/task-card';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  tasksList: Task[] = [
    {
      id: crypto.randomUUID(),
      title: 'Wash dishes',
      description: '',
      status: 'to do',
    },
    {
      id: crypto.randomUUID(),
      title: 'Home renovation',
      description: 'Repair the kitchen',
      status: 'in progress',
    },
    {
      id: crypto.randomUUID(),
      title: 'Take out the garbage',
      description: '',
      status: 'done',
    },
  ];

  public toDoTasks: Task[] = this.tasksList.filter((task) => task.status === 'to do');
  public inProgreessTasks: Task[] = this.tasksList.filter((task) => task.status === 'in progress');
  public doneTasks: Task[] = this.tasksList.filter((task) => task.status === 'done');
  private tasksService = inject(TasksService);

  addTask(task: Task) {
    this.tasksService.addTask(task);
  }
}
