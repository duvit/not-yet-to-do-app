import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { TaskFormModel } from '../../models/task-form.model';
import { TasksService } from '../../services/tasks-service';
import { PRIORITY, Task } from '../../models/task.model';

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

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    priority: [PRIORITY.MEDIUM, Validators.required],
  });

  onSubmit() {
    this.taskData = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description || '',
      priority: this.taskForm.value.priority as PRIORITY,
    };

    const task: Task = this.tasksService.taskFromData(this.taskData);
    this.tasksService.addTask(task);
    this.taskForm.reset();
    this.formSubmit.emit();
  }
}
