import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Task, TASK_STATUS } from '../../models/task.model';
import { TasksService } from '../../services/tasks-service';

interface SelectTarget extends EventTarget {
  value: string;
}

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnInit {
  private tasksService = inject(TasksService);
  public task = input.required<Task>();
  public taskId!: string;
  public taskStatus = signal<string>('');
  public tasksStatuses: string[] = Object.values(TASK_STATUS);

  public availableStatuses = computed(() => {
    const currentStatus = this.taskStatus(); // Отримуємо поточне значення сигналу

    // Автоматично переобчислюється, коли змінюється taskStatus()
    return this.tasksStatuses.filter((status) => status !== currentStatus);
  });

  public changeStatus(event: Event): void {
    const target = event.target as SelectTarget | null;
    if (target && target.value) {
      const newStatus: string = target.value;

      // 🟢 Оновлюємо сигнал за допомогою .set()
      this.taskStatus.set(newStatus);

      // Тут можна додати логіку виклику сервісу для збереження
     // this.tasksService.updateStatus(this.task().id, newStatus); 
    }
  }

  ngOnInit() {
    this.taskId = this.task().id;
    this.taskStatus.set(this.task().status);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.taskId);
  }

  updateTask() {
    this.tasksService.patchTask(this.taskId, TASK_STATUS.IN_PROGRESS);
  }
}
