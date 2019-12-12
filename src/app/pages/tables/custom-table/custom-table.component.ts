import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../core/@services/user.service';
import { NotificationService } from '../../../core/@services/notification.service'
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AddDialogComponent } from './add/add.dialog.component';
import { EditDialogComponent } from './edit/edit.dialog.component';
import { DeleteDialogComponent } from './delete/delete.dialog.component';
import { DataModel } from './model/data.model';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CrudMessage } from '../../../core/settings/crudmessage';
import { MessageService } from '../../../core/@services/message.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './custom-table.component.html',

})
export class CustomTableComponent implements OnInit {


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


  constructor(private UserService: UserService, public httpClient: HttpClient,
    public dialog: MatDialog, private messageService: MessageService, private NotificationService: NotificationService) {
     this.dataSource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.asyncSelected);
        //observer.complete();
      })
        .pipe(
          mergeMap((token: string) => this.UserService.getSearchemailTemplate(token))
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
    
    this.UserService.getTemplateByName(e.value).subscribe(result => {
    //  var singlelist =  []; 
    //  singlelist.push(result);
     this.usersList = result;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    this.asyncSelected ="";
    let res = await this.UserService.getAllEmailTemplate(this.currentPage);
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

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { model: event }
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(result);
      if (result) {
        this.getUser();
        this.messageService.showSuccess(CrudMessage.success_update)
      }

    });
  }
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
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
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: event.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
      if (result) {
        this.getUser();
        this.messageService.showSuccess(CrudMessage.success_delete)
      }

    });
  }
  
}


