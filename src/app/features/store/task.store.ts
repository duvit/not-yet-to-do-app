import { inject, Injectable, signal } from '@angular/core';
import { TaskSignal, Task, TASK_STATUS, PRIORITY } from '../../models/task.model';
import { TasksPersistence } from '../data/task.persistence';
import { TasksService } from '../../services/tasks-service';

@Injectable({
  providedIn: 'root',
})
export class TasksStore {
  public tasksList = signal<TaskSignal[]>([]);
  private tp = inject(TasksPersistence);
  private tasksService = inject(TasksService);

  constructor() {
    this.loadTasks();
  }

  public loadTasks() {
    const data: Task[] = this.tp.getTasks();
    this.tasksList.set(data.map((task) => this.tasksService.createTaskSignal(task)));
  }

  public saveTasks(): void {
    const data = this.tasksList().map((t) => this.tasksService.taskFromSignal(t));
    this.tp.putTasks(data);
  }

  public addTask(task: TaskSignal): void {
    this.tasksList.update((list) => [...list, task]);
    this.saveTasks();
  }

  public deleteTask(taskId: string): void {
    this.tasksList.update((list) => list.filter((task) => task.id !== taskId));
    this.saveTasks();
  }

  public changeTaskText(taskId: string, newData: { title: any; description: any }) {
    const task = this.getTaskByid(taskId);
    task?.title.set(newData.title);
    task?.description.set(newData.description);
    this.saveTasks();
  }

  public changeTaskStatus(taskId: string, newStatus: string): void {
    const dateField = newStatus === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';
    const task = this.getTaskByid(taskId);
    if (dateField === 'doneAt') {
      task?.doneAt.set(this.tasksService.formatDate());
      task?.isDone.set(true);
    } else {
      task?.updatedAt.set(this.tasksService.formatDate());
    }

    task?.status.set(newStatus as TASK_STATUS);
    this.saveTasks();
  }

  changeTaskPriority(taskId: string, newPriority: string) {
    const task = this.getTaskByid(taskId);
    task?.priority.set(newPriority as PRIORITY);
    this.saveTasks();
  }

  public getTaskByid(id: string): TaskSignal | undefined {
    return this.tasksList().find((task) => task.id === id);
  }
}
