import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauFormMultipleComponent } from './niveau-form-multiple.component';

describe('NiveauFormMultipleComponent', () => {
  let component: NiveauFormMultipleComponent;
  let fixture: ComponentFixture<NiveauFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
