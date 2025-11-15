import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
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
  public task = input.required<Task>();
  public taskId!: string;
  public taskStatus = signal<TASK_STATUS | null>(null);
  public readonly tasksStatuses: TASK_STATUS[] = Object.values(TASK_STATUS);
  public dropdownOpen: boolean = false;

  public availableStatuses = computed(() => {
    return this.tasksStatuses.filter((el) => el !== this.taskStatus());
  });

  public changeStatus(newStatus: string): void {
    this.taskStatus.set(newStatus as TASK_STATUS);
    this.updateTask();
    this.dropdownOpen = false;
  }

  constructor(private eRef: ElementRef) {}

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
    const task = this.task();
    const status = this.taskStatus();

    const dateField = status === TASK_STATUS.DONE ? 'doneAt' : 'updatedAt';

    this.tasksService.changeDate(task, dateField);
    this.tasksService.patchTask(this.taskId, status as TASK_STATUS);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @ViewChild('statusBlock') statusBlock!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = this.statusBlock?.nativeElement.contains(target);
    if (this.dropdownOpen && !clickedInside) {
      this.dropdownOpen = false;
    }
  }
}
