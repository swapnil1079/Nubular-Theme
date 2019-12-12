import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Event, NavigationError, Router } from '@angular/router';
import { dialogModelService } from './dialogModelService';
import { MessageService } from './message.service';
import { AppSettings } from '../settings/appsetting';
import { Observable } from "rxjs/Rx"
// import { NotificationService } from '@app/core/services/notification.service';
// import { parse } from 'error-stack-parser';
// import { Logger } from '@app/core/logger.';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {

    //   logger: Logger;
    constructor(private injector: Injector, private router: Router, private http: HttpClient, private dialogModelService: dialogModelService, private messageService: MessageService) {

        // this.logger = new Logger('Error Service');

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationError) {
                if (!navigator.onLine) {
                    return;
                }
                //todo:
                // this.postError(event.error).subscribe((errorWithContext) => {
                //   this.router.navigate(['/error'], { queryParams: errorWithContext });
                // })
            }
        });
    }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            
            //Server or connection error handling
            if (!navigator.onLine) {
                var model = {
                    message: 'No internet connection found. Please check your internet connection..',
                    condition: 'error'
                }
                return this.dialogModelService.callComponentMethod(model);
            } else {
                console.log('error');
                console.log(error.error);

                if (error.status == 204) {
                    var model = {
                        message: AppSettings.noresponse,
                        condition: 'error'
                    }
                }
                if (error.status == 400) {
                    var model = {
                        message: <string>error.error.message,
                        condition: 'error'
                    }
                }
                if (error.status == 401) {
                    var model = {
                        message: AppSettings.unauthorized,
                        condition: 'error'
                    }
                }
                if (error.status == 403) {
                    var model = {
                        message: AppSettings.forbidden,
                        condition: 'error'
                    }
                }
                if (error.status == 404) {
                    //debugger;
                    var model = {
                        message: <string>error.error.reason,
                        condition: 'error'
                    }
                }

                if (error.status == 500) {
                    var model = {
                        message: AppSettings.internalerror,
                        condition: 'error'
                    }

                }
                if (error.status == 406) {
                    var model = {
                        message: AppSettings.forbidden,
                        condition: 'error'
                    }
                
                }
                if (error.status == 522) {
                    var model = {
                        message: AppSettings.ServerTimeouterror,
                        condition: 'error'
                    }
                }
                this.dialogModelService.callComponentMethod(model);
                return Observable.throw(error)

            }
        }
    }

    postError(error) {
        const errorToSend = this.addContextInfo(error);
        return this.http.post('todo:', errorToSend);
    }

    addContextInfo(error) {
        const name = error.name || null;
        const appId = 'tinsureWebApp';
        const user = 'tinsureWebUser';
        const time = new Date().getTime();
        const id = `${appId}-${user}-${time}`;
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const status = error.status || null;
        const message = error.message || error.toString();


        // const stack = error instanceof HttpErrorResponse ? null : parse(error);

        // const errorToSend = { name, appId, user, time, id, url, status, message, stack };

        // return errorToSend;
    }


}
