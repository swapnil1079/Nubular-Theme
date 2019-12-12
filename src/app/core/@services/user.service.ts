import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx"
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../settings/appsetting';
import { EmailType } from '../settings/emailtype';


@Injectable({
  providedIn: 'root'
})

export class UserService extends AppSettings {

  constructor(private http: HttpClient,
    private _router: Router) { super(); }

  emailTemplate = {
    "data": [
      {
        "_id": 1,
        "_class": "org.tm.api.notification.template.email.repository.document.EmailTemplate",
        "name": "INVITATION",
        "from": "noreply.globalwebsite@tm.org",
        "subject": "Welcome to Transcendental Meditation India",
        "body": "<html>\r\n<body style=\"font-family: Calibri,serif;font-size: 14px;\">\r\n<p>Dear <strong>$FIRST_NAME,</strong></p>\r\n<p>You have successfully registered for Mediatation Intro talks. Updated</p>\r\n<p>\r\n    Regards,<br/>\r\n    <strong>Transcendental Meditation Team</strong>\r\n</p>\r\n</body>\r\n</html>",
        "confidential": false,
        "active": true

      },
      {

        "_id": 2,
        "_class": "org.tm.api.notification.template.email.repository.document.EmailTemplate",
        "name": "INVITATION-2",
        "from": "noreply.globalwebsite@tm.org",
        "subject": "Welcome to Transcendental Meditation UK",
        "body": "<html>\r\n<body style=\"font-family: Calibri,serif;font-size: 14px;\">\r\n<p>Dear <strong>$FIRST_NAME,</strong></p>\r\n<p>You have successfully registered for Mediatation Intro talks. Updated</p>\r\n<p>\r\n    Regards,<br/>\r\n    <strong>Transcendental Meditation Team</strong>\r\n</p>\r\n</body>\r\n</html>",
        "confidential": true,
        "active": false

      }]

  }
  emailtemplateobject = {
    'name': 'test-template',
    'confidential': true,
    'active': false,
    'localise': [
      {
       'body': 'arabic-body',
       'defaultSubject': 'arabic subject',
       'displayFromName' : 'arabic - display from name',
       'locale': 'ar_AE'
      },
      {
        'body': 'english-body',
        'defaultSubject': 'english subject',
        'displayFromName' : 'english - display from name',
        'locale': 'en_US'
       },
       {
        'body': 'portugese-body',
        'defaultSubject': 'portguese subject',
        'displayFromName' : 'portugese - display from name',
        'locale': 'pt'
       }

    ]

  }

  emailWorkgroup = {
    "emailgroup": [{
      "id": 1,
      "name": "TESTWORKGROUP2",
      "description": "TESTWORKGROUP2 Description",
      "startTime": 1549216662396,
      "endTime": 1549216662395,
      "recurrence": true,
      "status": "DRAFT",
      "items": [
        {
          "template": {
            "name": "Series 1 email",
            "from": "TEAMGMG",
            "subject": "GROUP2 - SERIES1 - EMAIL",
            "body": "<html><body><strong>My test email</strong></body></html>",
            "confidential": true,
            "active": true
          },
          "sequentialOrder": 1,
          "numberOfDaysToWait": 0,
          "name": "Test email sequence 1",
          "description": "Test email GROUP 2 sequence 1 - description"
        }, {
          "template": {
            "name": "Series 2 email",
            "from": "TEAMGMG",
            "subject": "GROUP2 - SERIES2 - EMAIL",
            "body": "<html><body><strong>My test email2</strong></body></html>",
            "confidential": true,
            "active": true
          },
          "sequentialOrder": 2,
          "numberOfDaysToWait": 10,
          "name": "Test email sequence 2",
          "description": "Test email sequence 2 - description"
        }
      ]
    }]
  }

  public userList(): Observable<any> {
    return this.http.get(AppSettings.UserListApiUrl).map((response: Response) => {
      //console.log(response);
      return response;

    });
  }
  /* email Template  api's starts */
  public EmailTemplateDelete(templateName: String): Observable<any> {
    return this.http.delete(AppSettings.EmailTemplateUDRApiUrl + templateName).map((response: Response) => {
      return response;

    });
  }
  public EmailTemplateAdd(userDetails): Observable<any> {
    return this.http.post(AppSettings.EmailTemplateCreateApiUrl, userDetails).map((response: Response) => {
      return response;
    });
  }
  public EmailTemplateAdddummy(userDetails) {
    
  }

  public getTemplateByName(templateName: String): Observable<any> {
    var templatename = templateName.replace("%20", " ");
    return this.http.get(AppSettings.EmailTemplateUDRApiUrl + templatename).map((response: Response) => {
      return response;

    });
  }
  public UpdateEmailTemplateByName(TemplateDetails, templateName): Observable<any> {

    return this.http.put(AppSettings.EmailTemplateUDRApiUrl + templateName, TemplateDetails).map((response: Response) => {
      //console.log(response);
      return response;

    });
  }

  public getSearchemailTemplate(token): Observable<any> {

    const query = new RegExp(token, 'i');
    return this.http.get(AppSettings.EmailTemplateListApiUrl)
      .map((response: Response) => <any>response)
      .flatMap(data => Observable.from(data))
      .filter((value: any) => {
        // console.log(query.test(value.name));
        return query.test(value.name);
      }).toArray();

  }


  async getAllEmailTemplate(PageNumber) {
    return await this.http.get(AppSettings.EmailTemplateListApiUrl).toPromise();
  }

  /* email Template  api's ends */

  public EmailWorkgroupDelete(templateName: String): Observable<any> {
    return this.http.delete(AppSettings.UserListApiUrl).map((response: Response) => {
      //console.log(response);
      return true;

    });
  }




  async getAllEmailTemplateWithoutPaging() {
    //return await this.http.get(AppSettings.UserListApiUrl+'?page='+PageNumber).toPromise()
    return await this.emailTemplate;
  }



  async getAllEmailWorkgroup(PageNumber) {
    return await this.http.get(AppSettings.EmailWorkFlowGroupListApiUrl).toPromise()
  }
  public getSearchemailgroupTemplate(token): Observable<any> {

    const query = new RegExp(token, 'i');
    return this.http.get(AppSettings.EmailWorkFlowGroupListApiUrl)
      .map((response: Response) => <any>response)
      .flatMap(data => Observable.from(data))
      .filter((value: any) => {
        // console.log(query.test(value.name));
        return query.test(value.name);
      }).toArray();

  }

  public getEmailGroupByName(templateName: String): Observable<any> {
    return this.http.get(AppSettings.EmailWorkFlowGroupUDRApiUrl + templateName).map((response: Response) => {
      return response;

    });
  }

  public PostWorkGroup(userDetails): Observable<any> {
    return this.http.post(AppSettings.EmailWorkFlowGroupUDRApiUrl, userDetails).map((response: Response) => {
      return response;
    });
  }
  public UpdateWorkGroup(userDetails, WorkGroupName): Observable<any> {
    return this.http.put(AppSettings.EmailWorkFlowGroupUDRApiUrl + WorkGroupName, userDetails).map((response: Response) => {
      return response;
    });
  }

  public EmailGroupTemplateDelete(templateName: String): Observable<any> {
    return this.http.delete(AppSettings.EmailWorkFlowGroupUDRApiUrl + templateName).map((response: Response) => {
      return response;

    });
  }

  public getEmailType() {
    return EmailType.EmailTypeModel;
  }


  public lookupapi(): Observable<any> {
    return this.http.get(AppSettings.lookupapi).map((response: Response) => {
      return response;

    });
  }

}
