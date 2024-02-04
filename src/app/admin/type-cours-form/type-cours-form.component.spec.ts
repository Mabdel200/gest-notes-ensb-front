import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCoursFormComponent } from './type-cours-form.component';

describe('TypeCoursFormComponent', () => {
  let component: TypeCoursFormComponent;
  let fixture: ComponentFixture<TypeCoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCoursFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
