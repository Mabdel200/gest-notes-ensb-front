import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  record() {
    this.toastr.success("Enregistrement effectué ", 'Success', {
     
      positionClass: 'toast-top-right',
      timeOut: 3000,
    });
  }
  update() {
    this.toastr.success("Mise à jour effectuée ", 'Success');
  }
  
  remove() {
    this.toastr.error("Suppression effectuée", 'Error');
  }
  error() {
    this.toastr.error("Erreur survenir", 'Error');
  }
}
