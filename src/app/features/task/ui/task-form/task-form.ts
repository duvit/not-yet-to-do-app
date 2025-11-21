import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { TaskFormModel } from '../../../../shared/models/task-form.model';
import { TaskDomainService } from '../../../../core/utils/task-domain-service';
import { TASK_PRIORITY, TaskSignal } from '../../../../shared/models/task.model';
import { TasksStore } from '../../store/tasks.store';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, TitleCasePipe, MatSelectModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private formBuilder = inject(FormBuilder);
  public taskData!: TaskFormModel;
  private tasksStore = inject(TasksStore);
  private transform = inject(TaskDomainService);
  public formSubmit = output<void>();
  public priorities: TASK_PRIORITY[] = Object.values(TASK_PRIORITY);

  taskForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    priority: [TASK_PRIORITY.MEDIUM, Validators.required],
  });

  onSubmit() {
    if (this.taskForm.invalid) return;

    const { title, description, priority } = this.taskForm.getRawValue();

    const task: TaskSignal = this.transform.createTaskFromForm({
      title,
      description: description || '',
      priority,
    });

    this.tasksStore.addTask(task);

    this.taskForm.reset({
      title: '',
      description: '',
      priority: TASK_PRIORITY.MEDIUM,
    });

    this.formSubmit.emit();
  }
}
