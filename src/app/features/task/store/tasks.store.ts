import { inject, Injectable, signal } from '@angular/core';
import { TasksPersistence } from '../data-access/task.storage';
import { TaskDomainService } from '../data-access/tasks-transform';
import { Task } from '../../../shared/models/task.model';
import { TASK_PRIORITY } from '../../../shared/models/task-priority.enum';
import { TaskSignal } from '../data-access/task-signal.model';

@Injectable({
  providedIn: 'root',
})
export class TasksStore {
  public tasksList = signal<TaskSignal[]>([]);
  private persistence = inject(TasksPersistence);
  private transform = inject(TaskDomainService);

  constructor() {
    this.loadTasks();
  }

  public loadTasks() {
    const data: Task[] = this.persistence.getTasks();
    this.tasksList.set(data.map((task) => this.transform.createTaskSignal(task)));
  }

  public saveTasks(): void {
    const data = this.tasksList().map((t) => this.transform.taskFromSignal(t));
    this.persistence.putTasks(data);
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
    const task = this.getTaskByid(taskId);
    this.transform.changeStatus(task, newStatus);
    this.saveTasks();
  }

  public changeTaskPriority(taskId: string, newPriority: string) {
    const task = this.getTaskByid(taskId);
    task?.priority.set(newPriority as TASK_PRIORITY);
    this.saveTasks();
  }

  public getTaskByid(id: string): TaskSignal | undefined {
    return this.tasksList().find((task) => task.id === id);
  }
}
