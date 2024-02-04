import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCoursComponent } from './type-cours.component';

describe('TypeCoursComponent', () => {
  let component: TypeCoursComponent;
  let fixture: ComponentFixture<TypeCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
