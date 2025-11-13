import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFormModel } from '../../models/task-form.model';
import { TasksService } from '../../services/tasks-service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private formBuilder = inject(FormBuilder);
  public taskData!: TaskFormModel;
  private tasksService = inject(TasksService);

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
  });

  onSubmit() {
    this.taskData = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description || '',
    };

    const task: Task = this.tasksService.taskFromData(this.taskData);
    this.tasksService.addTask(task);

    this.taskForm.reset();
  }
}
