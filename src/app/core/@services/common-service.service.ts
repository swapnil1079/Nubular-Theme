import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { dialogModelService } from './dialogModelService';

@Injectable()
export class CommonServiceService {

  constructor(private dialogModelService: dialogModelService) { }

  checkInternetConnection() {
    let isOnline: boolean;
    Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    ).subscribe(result => {
      console.log(typeof (result));
      isOnline = result;
      //  console.log(isOnline);
      if (!result) {

        setTimeout(() => {
          var model = {
            message: 'No internet connection found. Please check your internet connection.',
            condition: 'error'
          }
          this.dialogModelService.callComponentMethod(model);
        }, 2500)
      }
    });
  }

}
