import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SortablejsModule } from 'angular-sortablejs';
import { NgxSortableModule } from 'ngx-sortable';
import {DragndropDirective} from './dragndrop.directive';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { UserService } from '../../core/@services/user.service'
import { NotificationService } from '../../core/@services/notification.service'
import { LoaderInterceptor } from '../../core/interceptors/loader-interceptor';
import { ServerErrorsInterceptor } from '../../core/interceptors/server-errors.interceptor';
import { CommonInterceptor } from '../../core/interceptors/common.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { dialogModelService } from '../../core/@services/dialogModelService';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, PaginationModule, TypeaheadModule, BsDropdownModule } from 'ngx-bootstrap'
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDialogComponent } from './custom-table/add/add.dialog.component';
import { EditDialogComponent } from './custom-table/edit/edit.dialog.component';
import { DeleteDialogComponent } from './custom-table/delete/delete.dialog.component';
import { AddSmsDialogComponent } from './sms-template/add/add.sms.dialog.component';
import { EditSmsDialogComponent } from './sms-template/edit/edit.sms.dialog.component';
import { DeleteSmsDialogComponent } from './sms-template/delete/delete.sms.dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { ValidationService } from "../../shared/validators/validation.service";
import { ErrorModule } from '../../module/error.module';
import { MessageService } from '../../core/@services/message.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LoaderService } from '../../core/@services/loader.service';
import { CreateWorkFlowComponent } from './email-workgroup/create/create-workflow.component';
import { ViewReportComponent } from './email-workgroup/viewReport/viewReport.component';
import { EmailWorkGroupCreateSubComponent } from './email-workgroup/create/sub-component/emailworkgroupcreatesub.component';
import { NbStepperModule } from '@nebular/theme';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DeleteWorkgroupComponent } from './email-workgroup/delete/deleteworkgroup.dialog.component';
import { EmailWorkGroupEditSubComponent } from './email-workgroup/edit/sub-component/emailworkgroupeditsub.component';
import { EditWorkFlowComponent } from './email-workgroup/edit/edit-workflow.component';
import { NbAccordionModule } from '@nebular/theme';
import { EmailLocaleComponent } from './custom-table/add/sub-component/emaillocalecomponent.component';
import { EmailTemplateEditSubComponent } from './custom-table/edit/sub-component/emailtemplateeditsub.component';


@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule, PaginationModule.forRoot(), NgxPaginationModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
    NbAccordionModule,  SortableModule,
    SortablejsModule.forRoot({
      animation: 200,
    }),
    NgxSortableModule,
    BsDropdownModule.forRoot(),
    MatTableModule, MatToolbarModule, FormsModule, ReactiveFormsModule, SharedModule, ErrorModule, CKEditorModule, NbStepperModule, OwlDateTimeModule, OwlNativeDateTimeModule, TypeaheadModule.forRoot(),
    UiSwitchModule.forRoot({
      size: 'medium',
      color: 'rgb(0, 189, 99)',
      switchColor: '#80FFA2',
      defaultBgColor: 'rgb(248, 248, 248)',
      defaultBoColor: '#476EFF',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    })
  ],
  declarations: [
    ...routedComponents, AddDialogComponent, EditDialogComponent, DeleteDialogComponent, AddSmsDialogComponent, EditSmsDialogComponent, DeleteSmsDialogComponent, CreateWorkFlowComponent, EmailWorkGroupCreateSubComponent, DeleteWorkgroupComponent, EditWorkFlowComponent, EmailWorkGroupEditSubComponent, ViewReportComponent, EmailLocaleComponent, EmailTemplateEditSubComponent,DragndropDirective
    // ,DialogModelComponent
  ],
  entryComponents: [
    AddDialogComponent, EditDialogComponent, DeleteDialogComponent, AddSmsDialogComponent, EditSmsDialogComponent, DeleteSmsDialogComponent, CreateWorkFlowComponent, EmailWorkGroupCreateSubComponent, DeleteWorkgroupComponent, EditWorkFlowComponent, EmailWorkGroupEditSubComponent, ViewReportComponent, EmailLocaleComponent, EmailTemplateEditSubComponent
  ],
  providers: [
    UserService, dialogModelService, ValidationService, MessageService, NotificationService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
  ]
})
export class TablesModule { }
