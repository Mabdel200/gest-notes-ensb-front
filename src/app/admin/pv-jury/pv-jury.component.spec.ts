import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvJuryComponent } from './pv-jury.component';

describe('PvJuryComponent', () => {
  let component: PvJuryComponent;
  let fixture: ComponentFixture<PvJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvJuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PvJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
