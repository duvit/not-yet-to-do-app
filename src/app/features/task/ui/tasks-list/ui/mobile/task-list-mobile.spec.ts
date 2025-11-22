import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListMobile } from './task-list-mobile';

describe('TaskListMobile', () => {
  let component: TaskListMobile;
  let fixture: ComponentFixture<TaskListMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
