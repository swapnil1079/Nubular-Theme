import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserStorageService } from '../@services/UserStorage.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private UserStorageService:UserStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
      //debugger   
    // const req = request.clone({
    //   setHeaders: {
    //     //'Access-Control-Expose-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,xxx'        
    //   }
    // })
    //   request = request.clone({
    //     setHeaders: {
    //         Authorization: `Bearer cgfgfhgfh`
    //     }
    // })
    // const authReq = request.clone({
    //   headers: request.headers.set('Content-Type', 'application/json')
    // });
    // const authReq = request.clone({
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     //'Authorization': 'my-auth-token'
    //   })
    // });
    const token: string = this.UserStorageService.GetToken();
    console.log(token);
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }

  // if this is a login-request the header is
  // already set to x/www/formurl/encoded.
  // so if we already have a content-type, do not
  // set it, but if we don't have one, set it to
  // default --> json
  if (!req.headers.has('Content-Type')) {
      req = req.clone({ 
        headers: req.headers.set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
       });
  }
 // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
  }
}