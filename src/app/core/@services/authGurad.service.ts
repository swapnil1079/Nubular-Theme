import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserStorageService} from './UserStorage.service'
import { UserResponse } from '../models/userResponse.model';

@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router,  private response: UserStorageService){}
 

//=====================================================for checking if token exist=====================================  
  canActivate() 
  {
    let userResponse: UserResponse = this.response.GetUserResponse();
    //console.log(userResponse);
    if (userResponse.token) {
     return true;
    } 
    this.router.navigate(['/auth']);
    return false;
  }
}
