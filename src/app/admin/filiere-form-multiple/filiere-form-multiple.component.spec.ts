import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereFormMultipleComponent } from './filiere-form-multiple.component';

describe('FiliereFormMultipleComponent', () => {
  let component: FiliereFormMultipleComponent;
  let fixture: ComponentFixture<FiliereFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
