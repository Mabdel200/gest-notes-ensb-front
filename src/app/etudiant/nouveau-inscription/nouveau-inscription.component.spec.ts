import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauInscriptionComponent } from './nouveau-inscription.component';

describe('NouveauInscriptionComponent', () => {
  let component: NouveauInscriptionComponent;
  let fixture: ComponentFixture<NouveauInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveauInscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
