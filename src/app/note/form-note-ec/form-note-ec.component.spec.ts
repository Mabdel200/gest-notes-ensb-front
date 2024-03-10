import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoteEcComponent } from './form-note-ec.component';

describe('FormNoteEcComponent', () => {
  let component: FormNoteEcComponent;
  let fixture: ComponentFixture<FormNoteEcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormNoteEcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNoteEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
