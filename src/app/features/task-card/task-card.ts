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
import { TaskSignal, TASK_STATUS, PRIORITY } from '../../models/task.model';
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
  public readonly tasksPriorities: PRIORITY[] = Object.values(PRIORITY);
  public statusDropdownOpen = signal<boolean>(false);
  public priorityDropdownOpen = signal(false);
  public isEditing = signal<boolean>(false);
  public editModel = {
    title: '',
    description: '',
  };

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((status) => status !== this.task().status());
  });

  public availablePriorities = computed(() => {
    return this.tasksPriorities.filter((priority) => priority !== this.task().priority());
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
    this.statusDropdownOpen.set(false);
  }

  changePriority(priority: string) {
    this.task().priority.set(priority as PRIORITY);
    this.tasksService.saveTasks();
    this.priorityDropdownOpen.set(false);
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

  public toggleStatusDropdownOpen() {
    this.statusDropdownOpen.set(!this.statusDropdownOpen());
  }

  public togglePriorityDropdown() {
    this.priorityDropdownOpen.set(!this.priorityDropdownOpen());
  }

  @ViewChild('statusBlock') statusBlock!: ElementRef;
  @ViewChild('priorityBlock') priorityBlock!: ElementRef;

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const insideStatus = this.statusBlock?.nativeElement.contains(target);
    const insidePriority = this.priorityBlock?.nativeElement.contains(target);

    if (!insideStatus) this.statusDropdownOpen.set(false);
    if (!insidePriority) this.priorityDropdownOpen.set(false);
  }
}
