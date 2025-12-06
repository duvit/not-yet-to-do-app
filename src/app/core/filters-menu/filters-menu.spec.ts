import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMenu } from './filters-menu';

describe('FiltersMenu', () => {
  let component: FiltersMenu;
  let fixture: ComponentFixture<FiltersMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
