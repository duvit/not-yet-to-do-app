import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  output,
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
export class TaskCard implements OnInit {
  private tasksService = inject(TasksService);
  public task = input.required<TaskSignal>();
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public dropdownOpen = signal<boolean>(false);
  public isEditing = signal<boolean>(false);
  public editModel = {
    title: '',
  };

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((status) => status !== this.task().status());
  });

  ngOnInit() {
    console.log(this.task());
  }

  public changeStatus(newStatus: string): void {
    this.task().status.set(newStatus as TASK_STATUS);
    this.dropdownOpen.set(false);
  }

  public editTask() {
    this.editModel.title = this.task().title();
    this.isEditing.set(true);
  }

  public saveEdit() {
    this.task().title.set(this.editModel.title);
    this.isEditing.set(false);
  }

  public cancelEdit() {
    this.isEditing.set(false);
  }

  public updateStatus() {
    const dateField = this.task().status() === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';
    if (dateField === 'doneAt') {
      this.task().isDone.set(true);
    }
    const updated = this.tasksService.updateStatus(this.task(), this.task().status(), dateField);
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
