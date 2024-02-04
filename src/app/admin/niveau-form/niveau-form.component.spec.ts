import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauFormComponent } from './niveau-form.component';

describe('NiveauFormComponent', () => {
  let component: NiveauFormComponent;
  let fixture: ComponentFixture<NiveauFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
