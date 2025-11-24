import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnMobile } from './task-column-mobile';

describe('TaskColumnMobile', () => {
  let component: TaskColumnMobile;
  let fixture: ComponentFixture<TaskColumnMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskColumnMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskColumnMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
