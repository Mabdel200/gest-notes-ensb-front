import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteUeComponent } from './update-note-ue.component';

describe('UpdateNoteUeComponent', () => {
  let component: UpdateNoteUeComponent;
  let fixture: ComponentFixture<UpdateNoteUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateNoteUeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNoteUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
