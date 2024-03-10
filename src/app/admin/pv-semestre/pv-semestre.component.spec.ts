import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvSemestreComponent } from './pv-semestre.component';

describe('PvSemestreComponent', () => {
  let component: PvSemestreComponent;
  let fixture: ComponentFixture<PvSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvSemestreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PvSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
