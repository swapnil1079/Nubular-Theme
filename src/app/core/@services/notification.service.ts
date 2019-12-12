import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx"
import { Response, Headers, RequestOptions,Http } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../settings/appsetting';


@Injectable({
  providedIn: 'root'
})

export class NotificationService extends AppSettings  {

  constructor( private http: HttpClient,
    private _router: Router) { super(); }


  smsTemplate = {
    "data":[
     {
        "_id" : 1,
        "_class" : "org.tm.api.notification.template.email.repository.document.EmailTemplate",
        "name" : "INVITATION",
        "body" : "Mediatation Intro talks. Updated",
        "originator" : "Mediatation",
        "active" : true

      },
      {
       
        "_id" : 2,
        "_class" : "org.tm.api.notification.template.email.repository.document.EmailTemplate",
        "name" : "INVITATION-2",
         "body" : "Mediatation Intro talks. Updated",
        "originator" : "Mediatation",
        "active" : true

      }]
  
  }

  

    /* sms template api call  starts*/
     public SmsTemplateDelete(templateName :String): Observable<any> {
       return this.http.delete(AppSettings.SmsTemplateUDRApiUrl+templateName).map((response: Response) => {
        return response;

    });
  }
  public SmsTemplateAdd(userDetails): Observable<any> {
    return this.http.post(AppSettings.SmsTemplateCreateApiUrl, userDetails).map((response: Response) => {
      return response;
    });
   }
   public UpdateSmsTemplateByName(TemplateDetails,templateName): Observable<any> {
   
      return this.http.put(AppSettings.SmsTemplateUDRApiUrl+templateName,TemplateDetails).map((response: Response) => {
       return response;

    });
  }

   public getTemplateByName(templateName: String): Observable<any> {
    return this.http.get(AppSettings.SmsTemplateUDRApiUrl+templateName).map((response: Response) => {
       return response;

    });
  }
   
    async getAllSmsTemplate(PageNumber) {
    return await this.http.get(AppSettings.SmsTemplateListApiUrl).toPromise();
}
public getSearchSmsTemplate(token) :Observable<any> {
    
    const query = new RegExp(token, 'i');
    return this.http.get(AppSettings.SmsTemplateListApiUrl)
    .map((response: Response) => <any> response)
    .flatMap(data => Observable.from(data)) 
    .filter((value: any) => {
     // console.log(query.test(value.name));
       return query.test(value.name);
    }).toArray();
   
  }


 /* sms template api call ends  */
}
