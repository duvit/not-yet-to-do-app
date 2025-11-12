import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TASK_STATUS } from '../../models/task.model';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnInit {
  private tasksService = inject(TasksService);
  public task = input.required<Task>();
  public taskId!: string;
  public taskStatus = signal<TASK_STATUS | null>(null);
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((el) => el !== this.taskStatus());
  });

  public changeStatus(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.taskStatus.set(target.value as TASK_STATUS);
    this.updateTask();
  }

  ngOnInit() {
    this.taskId = this.task().id;
    this.taskStatus.set(this.task().status);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.taskId);
  }

  markAsDone() {
    this.taskStatus.set(TASK_STATUS.DONE);
    this.updateTask();
  }

  updateTask() {
    this.tasksService.patchTask(this.taskId, this.taskStatus() as TASK_STATUS);
  }
}
