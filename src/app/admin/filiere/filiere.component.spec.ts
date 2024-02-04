import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereComponent } from './filiere.component';

describe('FiliereComponent', () => {
  let component: FiliereComponent;
  let fixture: ComponentFixture<FiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
