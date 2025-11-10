import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public saveTasks(taskArr: Task[]): void {
    localStorage.setItem('ny-tasks', JSON.stringify(taskArr));
  }

  public loadTasks(): Task[] | [] {
    const data = localStorage.getItem('ny-tasks');
    const tasksList = data ? JSON.parse(data) : [];
    return tasksList;
  }

  public addTask(task: Task): void {
    const tasksList: Task[] = this.loadTasks();
    tasksList.push(task);
    this.saveTasks(tasksList);
  }

  public deleteTask(taskId: string): void {
    let tasksList: Task[] = this.loadTasks();
    tasksList = tasksList.filter((task) => task.id != taskId);
    this.saveTasks(tasksList);
    console.log('Task deleted!');
  }
}
