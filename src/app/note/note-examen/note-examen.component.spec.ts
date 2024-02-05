import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteExamenComponent } from './note-examen.component';

describe('NoteExamenComponent', () => {
  let component: NoteExamenComponent;
  let fixture: ComponentFixture<NoteExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
