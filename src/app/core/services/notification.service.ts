import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  record(message :string ="Enregistrement effectué ", title: string = 'Success'): void {
    this.toastr.success(message, title);
  }
  update(message : string ="Mise à jour effectuée ", title: string = 'Success'): void {
    this.toastr.success(message, title);
  }
  remove(message : string ="Suppression effectuée ", title: string = 'Success'): void {
    this.toastr.success(message, title);
  }
  error(message : string = "Une erreur est survenue ", title: string = 'Error'): void {
    this.toastr.error(message, title);
  }

}
