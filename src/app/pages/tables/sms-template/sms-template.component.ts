import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../core/@services/notification.service'
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AddSmsDialogComponent } from './add/add.sms.dialog.component';
import { EditSmsDialogComponent } from './edit/edit.sms.dialog.component';
import { DeleteSmsDialogComponent } from './delete/delete.sms.dialog.component';
import { DataModel } from './model/data.model'
// import { dialogModelService } from '../../../core/@services/dialogModelService';
import { MessageService } from '../../../core/@services/message.service';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CrudMessage } from '../../../core/settings/crudmessage';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './sms-template.component.html',

})
export class SmsTemplateComponent implements OnInit {
  @ViewChild(AddSmsDialogComponent) child: AddSmsDialogComponent;

  usersList: any;
  userData: any;
  source: LocalDataSource = new LocalDataSource();
  currentPage = 1;
  //page: number = 0;
  sortOrder: string = 'ASC';
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;


  constructor(private NotificationService: NotificationService, public httpClient: HttpClient,
    public dialog: MatDialog, private messageService: MessageService) {
    this.dataSource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.asyncSelected);
        //observer.complete();
      })
        .pipe(
          mergeMap((token: string) => this.NotificationService.getSearchSmsTemplate(token))
        );

  }
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  
  typeaheadOnBlur($event)
  {
    if($event.target.value.length==1)
    {
      this.getUser();
    }
  }
 
  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log(e.value);
    this.NotificationService.getTemplateByName(e.value).subscribe(result => {
     var singlelist =  []; 
     singlelist.push(result);
     this.usersList = singlelist;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    this.asyncSelected ="";
    let res = await this.NotificationService.getAllSmsTemplate(this.currentPage);
    if (res) {
      this.usersList = res;
    }

  }
  listoperation($event: any) {
    this.currentPage = $event.page;
    this.getUser();
  }
  editTemplate(event) {

    // let res = await this.UserService.getTemplateByName(event.name);
    // console.log(res);

    const dialogRef = this.dialog.open(EditSmsDialogComponent, {
      data: { name: event.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
        this.messageService.showSuccess(CrudMessage.success_update)
      }

    });
  }
  addNew() {
    const dialogRef = this.dialog.open(AddSmsDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
      if (result) {
        this.getUser();
        this.messageService.showSuccess(CrudMessage.success_insert)

      }
    });
  }
  DeleteTemplate(event) {

    // let res = await this.UserService.getTemplateByName(event.name);
    // console.log(res);

    const dialogRef = this.dialog.open(DeleteSmsDialogComponent, {
      data: { name: event.name }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result==null) {
        this.getUser();
        this.messageService.showSuccess(CrudMessage.success_delete)
      }

    });
  }
}