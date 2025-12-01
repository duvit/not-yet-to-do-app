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
import { CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-card',
  imports: [CdkDragHandle, FormsModule, MatExpansionModule, StopExpansion, MatFormFieldModule, TextFieldModule],
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
  public isEditingTitle = signal(false);
  public isEditingDescription = signal(false);
  isPanelOpen: boolean = false;
  readonly statusIcons: Record<string, string> = {
    'to do': 'check_box_outline_blank',
    'in progress': 'arrow_upload_progress',
    done: 'check_circle',
  };
  readonly statusClassMap: Record<string, string> = {
    'to do': 'to-do',
    'in progress': 'in-progress',
    done: 'done',
  };
  public editModel = {
    title: '',
    description: '',
  };
  public availableStatuses = computed(() => {
    return this.taskConsts.getavailableStatuses();
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

  public editTitle() {
    console.log('12');
    this.editModel.title = this.task().title();
    this.isEditingTitle.set(true);

    setTimeout(() => {
      if (this.titleInput) {
        const textarea = this.titleInput.nativeElement;
        textarea.select();
      }
    }, 0);
  }

  public editDescription() {
    this.editModel.description = this.task().description() ?? '';
    this.isEditingDescription.set(true);

    setTimeout(() => {
      if (this.descriptionInput) {
        const textarea = this.descriptionInput.nativeElement;
        textarea.select();
      }
    }, 0);
  }

  public saveEdit() {
    const changes: Partial<{ title: string; description: string }> = {};

    if (this.isEditingTitle()) {
      changes.title = this.editModel.title;
    }

    if (this.isEditingDescription()) {
      changes.description = this.editModel.description;
    }
    this.tasksStore.changeTaskText(this.task().id, this.editModel);
    this.isEditingTitle.set(false);
    this.isEditingDescription.set(false);
  }

  public cancelEdit() {
    this.isEditingTitle.set(false);
    this.isEditingDescription.set(false);
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

  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('priorityBlock') priorityBlock!: ElementRef;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLTextAreaElement>;

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const insideTitle = this.title?.nativeElement.contains(target);
    const insideDescription = this.description?.nativeElement.contains(target);
    const insidePriority = this.priorityBlock?.nativeElement.contains(target);

    if (this.isEditingTitle() && !insideTitle) {
      this.isEditingTitle.set(false);
      this.saveEdit();
    }
    if (this.isEditingDescription() && !insideDescription) {
      this.isEditingDescription.set(false);
      this.saveEdit();
    }
    if (!insidePriority) this.priorityDropdownOpen.set(false);
  }
}
