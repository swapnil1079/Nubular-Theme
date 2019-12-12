import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx"
import { Response, Headers, RequestOptions,Http } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../settings/appsetting';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService extends AppSettings  {

  constructor( private http: HttpClient,
    private _router: Router) { super(); }

  public getLogin(username,password): Observable<any> {
    var object  = {
      "username":username,
      "password":password
    }
   return this.http.post(AppSettings.loginApiUrl,object).map((response: Response) => {
     //console.log(response);
      return response;

    });
  }
  public getRegister(username,password,lastName,firstName): Observable<any> {
    var object  = {
      "username":username,
      "password":password,
      "lastName":lastName,
      "firstName":firstName
    }
   return this.http.post(AppSettings.RegisterApiUrl,object).map((response: Response) => {
     console.log(response);
      return response;

    });
  }
}
