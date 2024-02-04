import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeAcademiqueFormComponent } from './annee-academique-form.component';

describe('AnneeAcademiqueFormComponent', () => {
  let component: AnneeAcademiqueFormComponent;
  let fixture: ComponentFixture<AnneeAcademiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneeAcademiqueFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeAcademiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
