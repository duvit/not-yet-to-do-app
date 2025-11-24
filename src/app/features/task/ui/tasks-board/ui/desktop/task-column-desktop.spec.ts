import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnDesktop } from './task-column-desktop';

describe('TaskColumnDesktop', () => {
  let component: TaskColumnDesktop;
  let fixture: ComponentFixture<TaskColumnDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskColumnDesktop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskColumnDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
