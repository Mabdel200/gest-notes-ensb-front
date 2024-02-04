import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationFormMultipleComponent } from './evaluation-form-multiple.component';

describe('EvaluationFormMultipleComponent', () => {
  let component: EvaluationFormMultipleComponent;
  let fixture: ComponentFixture<EvaluationFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
