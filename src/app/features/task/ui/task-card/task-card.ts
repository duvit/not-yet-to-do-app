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
import { MatExpansionModule } from '@angular/material/expansion';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TasksStore } from '../../store/tasks.store';
import { TasksConstants } from '../../../../core/utils/task-constants.util';
import { TaskSignal } from '../../data-access/task-signal.model';
import { TASK_STATUS } from '../../../../shared/models/task-status.enum';
import { StopExpansion } from '../../../../shared/stop-epansion/stop-expansion';
import { getDueStatus } from '../../../..//core/utils/due-status';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, MatExpansionModule, StopExpansion, MatFormFieldModule, TextFieldModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  public task = input.required<TaskSignal>();
  private tasksStore = inject(TasksStore);
  private taskConsts = inject(TasksConstants);
  public dueStatus = computed(() => getDueStatus(this.task().dueDate()));
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
    this.tasksStore.changeTaskStatus(this.task().id, newStatus as TASK_STATUS);
    this.statusDropdownOpen.set(false);
  }

  public changePriority(newPriority: string) {
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

  onContentChange(event: Event): void {
    const target = event.target as HTMLElement;
    this.editModel.title = target.innerText;
  }

  model = 'some text';

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
