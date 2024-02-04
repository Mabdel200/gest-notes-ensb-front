import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeAcademiqueComponent } from './annee-academique.component';

describe('AnneeAcademiqueComponent', () => {
  let component: AnneeAcademiqueComponent;
  let fixture: ComponentFixture<AnneeAcademiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneeAcademiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeAcademiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
