import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreFormComponent } from './semestre-form.component';

describe('SemestreFormComponent', () => {
  let component: SemestreFormComponent;
  let fixture: ComponentFixture<SemestreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemestreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemestreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
