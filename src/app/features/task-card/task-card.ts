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
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public task = input.required<Task>();
  public taskUpdated = output<Task>();
  public taskId = signal<string>('');
  public taskTitle = signal<string>('');
  public taskStatus = signal<TASK_STATUS | null>(null);
  public isDone!: boolean;
  public dropdownOpen = signal<boolean>(false);
  public isEditing = signal<boolean>(false);
  public editModel = {
    title: '',
  };

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((el) => el !== this.taskStatus());
  });

  ngOnInit() {
    this.taskId.set(this.task().id);
    this.taskTitle.set(this.task().title);
    this.taskStatus.set(this.task().status);
    this.isDone = this.task().isDone as boolean;
  }

  public changeStatus(newStatus: string): void {
    this.taskStatus.set(newStatus as TASK_STATUS);
    this.updateStatus();
    this.dropdownOpen.set(false);
  }

  public editTask() {
    this.editModel.title = this.taskTitle();
    this.isEditing.set(true);
  }

  public saveEdit() {
    const newTitleTask = { ...this.task(), title: this.editModel.title };
    this.tasksService.updateTask(newTitleTask);
    this.taskTitle.set(this.editModel.title);
    this.isEditing.set(false);
  }

  public cancelEdit() {
    this.isEditing.set(false);
  }

  public updateStatus() {
    const dateField = this.taskStatus() === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';
    if (dateField === 'doneAt') {
      this.task();
    }
    const updated = this.tasksService.updateStatus(
      this.task(),
      this.taskStatus() as TASK_STATUS,
      dateField
    );
    this.taskUpdated.emit(updated);
  }

  public deleteTask() {
    this.tasksService.deleteTask(this.taskId());
  }

  // markAsDone() {
  //   this.taskStatus.set(TASK_STATUS.DONE);
  //   this.updateTask();
  // }

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
