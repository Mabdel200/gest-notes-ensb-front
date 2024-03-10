import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPreinscriptionComponent } from './listes-preinscription.component';

describe('ListesPreinscriptionComponent', () => {
  let component: ListesPreinscriptionComponent;
  let fixture: ComponentFixture<ListesPreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListesPreinscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListesPreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
