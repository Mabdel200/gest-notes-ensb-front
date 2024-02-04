import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCoursFormMultipleComponent } from './type-cours-form-multiple.component';

describe('TypeCoursFormMultipleComponent', () => {
  let component: TypeCoursFormMultipleComponent;
  let fixture: ComponentFixture<TypeCoursFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCoursFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCoursFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
