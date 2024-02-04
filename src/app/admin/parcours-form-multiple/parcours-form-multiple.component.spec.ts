import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursFormMultipleComponent } from './parcours-form-multiple.component';

describe('ParcoursFormMultipleComponent', () => {
  let component: ParcoursFormMultipleComponent;
  let fixture: ComponentFixture<ParcoursFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcoursFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcoursFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
