import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvListeComponent } from './pv-liste.component';

describe('PvListeComponent', () => {
  let component: PvListeComponent;
  let fixture: ComponentFixture<PvListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
