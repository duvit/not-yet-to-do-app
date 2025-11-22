import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDesktop } from './task-list-desktop';

describe('TaskListDesktop', () => {
  let component: TaskListDesktop;
  let fixture: ComponentFixture<TaskListDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListDesktop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
