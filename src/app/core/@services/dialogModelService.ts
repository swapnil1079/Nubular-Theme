import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class dialogModelService {
  
  private componentMethodCallSource = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod(model)  {
  	console.log(model);
  	console.log(this.componentMethodCallSource.asObservable());
    this.componentMethodCallSource.next(model);    
  }

}
