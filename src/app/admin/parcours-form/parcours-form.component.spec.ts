import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursFormComponent } from './parcours-form.component';

describe('ParcoursFormComponent', () => {
  let component: ParcoursFormComponent;
  let fixture: ComponentFixture<ParcoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcoursFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
