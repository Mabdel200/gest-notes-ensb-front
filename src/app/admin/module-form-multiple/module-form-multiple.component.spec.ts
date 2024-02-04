import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFormMultipleComponent } from './module-form-multiple.component';

describe('ModuleFormMultipleComponent', () => {
  let component: ModuleFormMultipleComponent;
  let fixture: ComponentFixture<ModuleFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
