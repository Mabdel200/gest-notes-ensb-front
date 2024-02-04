import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinscriptionComponent } from './preinscription.component';

describe('PreinscriptionComponent', () => {
  let component: PreinscriptionComponent;
  let fixture: ComponentFixture<PreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
