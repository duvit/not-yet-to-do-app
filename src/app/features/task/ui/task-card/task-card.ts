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
import { TaskSignal } from '../../../../shared/models/task.model';
import { TasksStore } from '../../store/tasks.store';
import { TasksConstants } from '../../../../core/utils/task-constants.util';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  public task = input.required<TaskSignal>();
  private tasksStore = inject(TasksStore);
  private taskConsts = inject(TasksConstants);
  public statusDropdownOpen = signal(false);
  public priorityDropdownOpen = signal(false);
  public isEditing = signal(false);
  public editModel = {
    title: '',
    description: '',
  };
  public availableStatuses = computed(() => {
    return this.taskConsts.getavailableStatuses(this.task().status());
  });
  public availablePriorities = computed(() => {
    return this.taskConsts.getavailablePriorities(this.task().priority());
  });

  public changeStatus(newStatus: string): void {
    this.tasksStore.changeTaskStatus(this.task().id, newStatus);
    this.statusDropdownOpen.set(false);
  }

  changePriority(newPriority: string) {
    this.tasksStore.changeTaskPriority(this.task().id, newPriority);
    this.priorityDropdownOpen.set(false);
  }

  public editTask() {
    this.editModel.title = this.task().title();
    this.editModel.description = this.task().description() ?? '';
    this.isEditing.set(true);
  }

  public saveEdit() {
    this.tasksStore.changeTaskText(this.task().id, this.editModel);
    this.isEditing.set(false);
  }

  public cancelEdit() {
    this.isEditing.set(false);
  }

  public deleteTask() {
    this.tasksStore.deleteTask(this.task().id);
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
