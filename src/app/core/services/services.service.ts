import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, share, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { api as apiConfig } from '../configs/constants';
import { read, utils } from 'xlsx';

import { Router, ActivatedRoute } from '@angular/router';
import { PVCoursRequest } from '../models/pv-request';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  public host = `${apiConfig.baseUrl}`;
  json: any = [];


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private getToken() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? accessToken : "";
  }

  // region abdel
  public getResourceMany(url: string, params: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
      responseType: 'json',
    };

    const urlWithParams = this.buildUrlWithParams(url, params);

    return this.http.get<any[]>(urlWithParams, httpOptions);
  }

  private buildUrlWithParams(url: string, params: any): string {
    let urlWithParams = this.host + url;

    if (params) {
      // Append parameters to the URL
      const keys = Object.keys(params);
      if (keys.length > 0) {
        urlWithParams += '?';

        keys.forEach((key, index) => {
          urlWithParams += `${key}=${params[key]}`;

          if (index < keys.length - 1) {
            urlWithParams += '&';
          }
        });
      }
    }

    return urlWithParams;
  }

  // public  getPVCours(requestHeader: PVCoursRequest): Observable<any> {
  //     const url = `${this.host}findPVCours`;
  
  //     // Les informations sont maintenant ajoutées comme en-têtes HTTP
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'session': requestHeader.session.toString(),
  //         'code': requestHeader.code.toString(),
  //         'type': requestHeader.type,
  //         'anneeAca': requestHeader.anneeAca.toString(),
  //         'parcours': requestHeader.parcours.toString(),
  //       }),
  //     };
  
  //     return this.http.get<any[]>(url, httpOptions);
  // }
  
  // end region

  public getResource(url: string, id: any): Observable<any> {
    //const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //   Authorization: authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.get<any[]>(this.host + url + '/' + id, httpOptions);
  }

  //-------------------------header httpOptions----------------------
  public saveResource(url: string, data: any): Observable<any> {
    //  const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  Authorization: authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.post<any[]>(this.host + url, data, httpOptions);
  }

  public getResources(url: string): Observable<any> {
    //const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    // return this.http.get<any[]>(this.host + url);
    return this.http.get<any[]>(this.host + url, httpOptions);

  }


  public updateResource(url: string, data: any): Observable<any> {
    //const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        //   Authorization: authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.put<any[]>(this.host + url, data, httpOptions);
  }


  public deleteResource(url: string, id: any) {
    //const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        //  Authorization: authToken,
      }),
    };

    return this.http.delete(this.host + url + id, httpOptions);
  }

  public readUploadFile = (e: any) => {
    e.preventDefault();
    let json: any = [];
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = utils.sheet_to_json(worksheet);
        console.log(json);
        //this.json = json;
      };
    }

    console.log('hors', json);
    return json
    console.log(json);
    //this.json = json;
  };
}


