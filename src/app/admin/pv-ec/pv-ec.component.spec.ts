import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvEcComponent } from './pv-ec.component';

describe('PvEcComponent', () => {
  let component: PvEcComponent;
  let fixture: ComponentFixture<PvEcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvEcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PvEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
