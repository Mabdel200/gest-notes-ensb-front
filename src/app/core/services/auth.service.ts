import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { api as apiConfig } from '../configs/constants';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = `${apiConfig.baseUrl}`;
  loading = false;

  constructor(private http: HttpClient, private router: Router,private adminService: ServicesService){}
  

 

  public register(url: string, data: any): Observable<any> {
    const httpOptions: any = {
      observe: 'response',
      responseType: 'json'
    };
    return this.http.post<any[]>(this.host + url, data, httpOptions);
  }

  login(data: any): Observable<any> {

    const url = `${apiConfig.auth.login}`;

    const httpOptions = {
     // withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // observe: 'response',
      // responseType: 'json'
    };

    return this.http
      .post<any>(this.host + url, data, httpOptions)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log('USER: ', user);

          if (!user) {
            this.loading = false;
            this.router.navigate(['login']);
          } else {
            console.log(user.role);
            
            // Setting token access and session variables
            localStorage.setItem('accessToken', user.accessToken);
            localStorage.setItem('refreshToken', user.refreshToken);
            sessionStorage.setItem('role', user.role);
            sessionStorage.setItem('userId', user.id);
            return user;
          }
        })
      );
  }


  logout(userId: any) {
    const url = `${apiConfig.auth.logout}`;

    this.adminService.getResource(url, userId).subscribe((data: any) => {
      let res: any = data;
      if (res.status == 200) {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
      } else {
        // this.notify.error('Server Error!', 'Une erreur interne est suvenue au niveau du serveur. Veuillez recommencer !');
      }
    });
    return of({ success: false });
  }

}
