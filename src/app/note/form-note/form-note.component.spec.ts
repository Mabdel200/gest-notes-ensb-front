import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoteComponent } from './form-note.component';

describe('FormNoteComponent', () => {
  let component: FormNoteComponent;
  let fixture: ComponentFixture<FormNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
