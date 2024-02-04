import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementFormMultipleComponent } from './departement-form-multiple.component';

describe('DepartementFormMultipleComponent', () => {
  let component: DepartementFormMultipleComponent;
  let fixture: ComponentFixture<DepartementFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartementFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartementFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
