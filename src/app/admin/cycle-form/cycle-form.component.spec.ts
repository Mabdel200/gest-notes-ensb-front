import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleFormComponent } from './cycle-form.component';

describe('CycleFormComponent', () => {
  let component: CycleFormComponent;
  let fixture: ComponentFixture<CycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
