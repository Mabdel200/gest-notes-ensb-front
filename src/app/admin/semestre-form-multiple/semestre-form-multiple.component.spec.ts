import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreFormMultipleComponent } from './semestre-form-multiple.component';

describe('SemestreFormMultipleComponent', () => {
  let component: SemestreFormMultipleComponent;
  let fixture: ComponentFixture<SemestreFormMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemestreFormMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemestreFormMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
