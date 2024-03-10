import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesInscriptionComponent } from './listes-inscription.component';

describe('ListesInscriptionComponent', () => {
  let component: ListesInscriptionComponent;
  let fixture: ComponentFixture<ListesInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListesInscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListesInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
