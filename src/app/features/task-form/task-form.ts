import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { TaskFormModel } from '../../models/task-form.model';
import { TasksService } from '../../services/tasks-service';
import { PRIORITY, Task, TaskSignal } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, TitleCasePipe, MatSelectModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private formBuilder = inject(FormBuilder);
  public taskData!: TaskFormModel;
  private tasksService = inject(TasksService);
  public formSubmit = output<void>();
  public priorities: PRIORITY[] = Object.values(PRIORITY);

  taskForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    priority: [PRIORITY.MEDIUM, Validators.required],
  });

  onSubmit() {
    if (this.taskForm.invalid) return;

    const { title, description, priority } = this.taskForm.getRawValue();

    const task: TaskSignal = this.tasksService.taskFromData({
      title,
      description: description || '',
      priority,
    });

    this.tasksService.addTask(task);

    this.taskForm.reset({
      title: '',
      description: '',
      priority: PRIORITY.MEDIUM,
    });

    this.formSubmit.emit();
  }
}
