import { TestBed } from '@angular/core/testing';

import { TasksFilters } from './tasks-filters.service';

describe('TasksFilters', () => {
  let service: TasksFilters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksFilters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
