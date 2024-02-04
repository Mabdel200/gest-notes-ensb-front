import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleFormMultipleComponent } from './cycle-form-multiple.component';

describe('CycleFormMultipleComponent', () => {
  let component: CycleFormMultipleComponent;
  let fixture: ComponentFixture<CycleFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
