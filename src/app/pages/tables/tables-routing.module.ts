import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { EmailWorkgroupComponent } from './email-workgroup/email-workgroup.component';
import { AddDialogComponent } from './custom-table/add/add.dialog.component';
import { EmailLocaleComponent } from './custom-table/add/sub-component/emaillocalecomponent.component';
import { EditDialogComponent } from './custom-table/edit/edit.dialog.component';
import { EmailTemplateEditSubComponent } from './custom-table/edit/sub-component/emailtemplateeditsub.component';
import { DeleteDialogComponent } from './custom-table/delete/delete.dialog.component';
import { AddSmsDialogComponent } from './sms-template/add/add.sms.dialog.component';
import { EditSmsDialogComponent } from './sms-template/edit/edit.sms.dialog.component';
import { DeleteSmsDialogComponent } from './sms-template/delete/delete.sms.dialog.component';
import { CreateWorkFlowComponent } from './email-workgroup/create/create-workflow.component';
import { EditWorkFlowComponent } from './email-workgroup/edit/edit-workflow.component';
import { EmailWorkGroupCreateSubComponent } from './email-workgroup/create/sub-component/emailworkgroupcreatesub.component';
import { EmailWorkGroupEditSubComponent } from './email-workgroup/edit/sub-component/emailworkgroupeditsub.component';
import {DeleteWorkgroupComponent} from './email-workgroup/delete/deleteworkgroup.dialog.component';
import { ViewReportComponent } from './email-workgroup/viewReport/viewReport.component';


const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'email-workflow',
      component: EmailWorkgroupComponent,
    },
    {
      path: 'email-template',
      component: CustomTableComponent,
    },
    {
      path: 'gallery',
      component: SmartTableComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent, CustomTableComponent,
  AddDialogComponent, EditDialogComponent, DeleteDialogComponent, SmsTemplateComponent,
  AddSmsDialogComponent, EditSmsDialogComponent, DeleteSmsDialogComponent, EmailWorkgroupComponent, CreateWorkFlowComponent,EmailWorkGroupCreateSubComponent,DeleteWorkgroupComponent,EditWorkFlowComponent,EmailWorkGroupEditSubComponent,ViewReportComponent,EmailLocaleComponent,EmailTemplateEditSubComponent
];
