import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SansModuleComponent } from './sans-module.component';

describe('SansModuleComponent', () => {
  let component: SansModuleComponent;
  let fixture: ComponentFixture<SansModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SansModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SansModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
