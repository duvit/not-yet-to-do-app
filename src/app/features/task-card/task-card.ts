import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskSignal, TASK_STATUS } from '../../models/task.model';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  private tasksService = inject(TasksService);
  public task = input.required<TaskSignal>();
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public dropdownOpen = signal<boolean>(false);
  public isEditing = signal<boolean>(false);
  public editModel = {
    title: '',
    description: '',
  };

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((status) => status !== this.task().status());
  });

  public changeStatus(newStatus: string): void {
    const dateField = newStatus === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';
    if (dateField === 'doneAt') {
      this.task().doneAt.set(this.tasksService.formatDate());
      this.task().isDone.set(true);
    } else {
      this.task().updatedAt.set(this.tasksService.formatDate());
    }

    this.task().status.set(newStatus as TASK_STATUS);
    this.tasksService.saveTasks();
    this.dropdownOpen.set(false);
  }

  public editTask() {
    this.editModel.title = this.task().title();
    this.editModel.description = this.task().description() ?? '';
    this.isEditing.set(true);
  }

  public saveEdit() {
    this.task().title.set(this.editModel.title);
    this.task().description.set(this.editModel.description);
    this.tasksService.saveTasks();
    this.isEditing.set(false);
  }

  public cancelEdit() {
    this.isEditing.set(false);
  }

  public deleteTask() {
    this.tasksService.deleteTask(this.task().id);
  }

  public toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  @ViewChild('statusBlock') statusBlock!: ElementRef;

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = this.statusBlock?.nativeElement.contains(target);
    if (this.dropdownOpen && !clickedInside) {
      this.dropdownOpen.set(false);
    }
  }
}
