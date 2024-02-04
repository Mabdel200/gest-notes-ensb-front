import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvecModuleComponent } from './avec-module.component';

describe('AvecModuleComponent', () => {
  let component: AvecModuleComponent;
  let fixture: ComponentFixture<AvecModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvecModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvecModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
