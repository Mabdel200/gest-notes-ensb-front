import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router: any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRole = sessionStorage.getItem("role")
    console.log("r",route.data['role']);

    if (userRole) {
      if (route.data['role'] !== userRole) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
