import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursFormMultipleComponent } from './cours-form-multiple.component';

describe('CoursFormMultipleComponent', () => {
  let component: CoursFormMultipleComponent;
  let fixture: ComponentFixture<CoursFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
