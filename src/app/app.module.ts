/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



/* services Import */
import { CommonServiceService } from './core/@services/common-service.service';
import { dialogModelService } from './core/@services/dialogModelService';
import { MessageService } from './core/@services/message.service';
import { LoginServiceService } from './core/@services/login-service.service';

import { LoaderService } from './core/@services/loader.service';
import { ValidationService } from "./shared/validators/validation.service";
import { USER_STORAGE, UserStorageService } from './core/@services/UserStorage.service';
import {AuthGuard} from './core/@services/authGurad.service';
 

/* Interceptors Import */
import { LoaderInterceptor } from './core/interceptors/loader-interceptor';
import { ServerErrorsInterceptor } from './core/interceptors/server-errors.interceptor';
import { CommonInterceptor } from './core/interceptors/common.interceptor';

/* Components Import */

import { LoginComponentComponent } from './module/login-component/login-component.component';
// import { LoaderComponent } from "./shared/Loader/loader.component";
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './module/error.module';
// import { ShowErrorsComponent } from './module/show-errors/show-errors.component';

//other npm modules
import { SESSION_STORAGE,StorageServiceModule } from 'ngx-webstorage-service';
// import { MessageModelComponent } from './shared/message-model/message-model.component';

import { MatCommonModule } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent,LoginComponentComponent
  
    //,MessageModelComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,SharedModule,ErrorModule,
    HttpModule,  RouterModule,MatCommonModule,StorageServiceModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
    CommonServiceService, dialogModelService, LoaderService, LoginServiceService, MessageService,ValidationService,AuthGuard,
    { provide: USER_STORAGE, useExisting: SESSION_STORAGE },
        UserStorageService
  ],
})
export class AppModule {
}


