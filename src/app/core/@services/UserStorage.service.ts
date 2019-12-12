import { Inject, Injectable, InjectionToken } from '@angular/core';
import { SESSION_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { UserResponse } from '../models/userResponse.model';
import { UserDetails } from '../models/UserDetails.model';

const USER_RESPONSE = 'userResponse';
export const USER_STORAGE =
    new InjectionToken<StorageService>('USER_STORAGE');
@Injectable()
export class UserStorageService {
    //private numberStorage: StorageService<any>
    constructor(
        @Inject(USER_STORAGE) private storage: StorageService
    ) {
        //debugger;
        //this.numberStorage = storage.withDefaultTranscoder(StorageTranscoders.JSON);

    }

    public GetUserResponse(): UserResponse {
        let userResponse: UserResponse = this.storage.get(USER_RESPONSE);
        if (userResponse == undefined || userResponse == null) {
            userResponse = new UserResponse();
        }
        return userResponse;
    }

    public SetUserResponse(userResponse: UserResponse) {

        //this.numberStorage.set(USER_RESPONSE,value);
        this.storage.set(USER_RESPONSE, userResponse)
    }
    public resetUserResponse() {
        let userResponse: UserResponse = this.GetUserResponse();
        let newUserResponse = new UserResponse();
        this.SetUserResponse(newUserResponse);

    }
    public SetUserDetails(UserDetails: UserDetails) {
        let userResponse: UserResponse;
        userResponse = this.GetUserResponse();
        userResponse.userDetails = UserDetails;
        this.SetUserResponse(userResponse);
    };
    public GetUserDetails(): UserDetails {
        let userResponse: UserResponse = this.GetUserResponse();
        return userResponse.userDetails;
    }
    public SetToken(value: string) {
        let userResponse: UserResponse;
        userResponse = this.GetUserResponse();
        userResponse.token = value;
        this.SetUserResponse(userResponse);
    };
    public GetToken(): string {
        let userResponse: UserResponse = this.GetUserResponse();
        return userResponse.token;
    }


    // ...
}