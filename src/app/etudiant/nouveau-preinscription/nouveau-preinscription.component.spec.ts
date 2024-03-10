import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPreinscriptionComponent } from './nouveau-preinscription.component';

describe('NouveauPreinscriptionComponent', () => {
  let component: NouveauPreinscriptionComponent;
  let fixture: ComponentFixture<NouveauPreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveauPreinscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauPreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
