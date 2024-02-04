import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private value: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  isAdminPage$ = this.value.asObservable();

 
  constructor() { }


  /**
   * Fonction de gerer l'affichage de la page de connexion et les autres pages 
   */
  updateDisplayPage(newValue: Boolean) {
    this.value.next(newValue);
  }

}
