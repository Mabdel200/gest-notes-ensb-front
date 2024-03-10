import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteEcComponent } from './update-note-ec.component';

describe('UpdateNoteEcComponent', () => {
  let component: UpdateNoteEcComponent;
  let fixture: ComponentFixture<UpdateNoteEcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateNoteEcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNoteEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
