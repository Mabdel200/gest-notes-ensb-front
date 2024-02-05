import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymatFormComponent } from './anonymat-form.component';

describe('AnonymatFormComponent', () => {
  let component: AnonymatFormComponent;
  let fixture: ComponentFixture<AnonymatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnonymatFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnonymatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
