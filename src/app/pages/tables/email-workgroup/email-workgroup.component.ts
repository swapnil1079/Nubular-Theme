import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../core/@services/user.service';
import { NotificationService } from '../../../core/@services/notification.service'
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DeleteWorkgroupComponent } from './delete/deleteworkgroup.dialog.component';
import { MessageService } from '../../../core/@services/message.service';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ViewReportComponent } from './viewReport/viewReport.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './email-workgroup.component.html',

})
export class EmailWorkgroupComponent implements OnInit {

  editModel: any;
  usersList: any;
  showCreate: boolean = false;
  showList: boolean = true;
  showEdit: boolean = false;
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
        mergeMap((token: string) => this.UserService.getSearchemailgroupTemplate(token))
      );

  }
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnBlur($event) {
    if ($event.target.value.length == 1) {
      this.getEmailWorkgroupList();
    }
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {

    this.UserService.getEmailGroupByName(e.value).subscribe(result => {
      var singlelist = [];
      singlelist.push(result);
      this.usersList = singlelist;
    });
  }

  ngOnInit() {
    this.getEmailWorkgroupList();

  }

  async getEmailWorkgroupList() {
    this.asyncSelected = "";
    let res = await this.UserService.getAllEmailWorkgroup(this.currentPage);
    if (res) {
      this.usersList = res;

    }

  }
  listoperation($event: any) {
    this.currentPage = $event.page;
    this.getEmailWorkgroupList();
  }
  CreateWorkFlow() {
    this.showList = false;
    this.showCreate = true;
    this.showEdit = false;
  }
  async editworkgroup(item) {

    this.UserService.getEmailGroupByName(item.name).subscribe(result => {
      this.showList = false;
      this.showCreate = false;
      this.showEdit = true;
      this.editModel = result;
    });


  }
  // editTemplate(event)
  // {

  //   // let res = await this.UserService.getTemplateByName(event.name);
  //   // console.log(res);

  //   const dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {name : event.name}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     //alert(12);
  //    // console.log(this.child);
  //     console.log(result);
  //     if(result)
  //     {
  //     this.getUser();
  //     this.messageService.showSuccess('update message')
  //     }

  //   });
  // }
  // addNew() {
  //   const dialogRef = this.dialog.open(AddDialogComponent, {
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if(result)
  //     {
  //     //this.getUser();
  //     this.messageService.showSuccess('success message')

  //     }
  //     // if (result === 1) {
  //     //   // After dialog is closed we're doing frontend updates
  //     //   // For add we're just pushing a new row inside DataService
  //     //   alert(23545);
  //     //   // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
  //     //   // this.refreshTable();
  //     // }
  //   });
  // }

  DeleteWorkGroup(event) {

    // let res = await this.UserService.getTemplateByName(event.name);
    // console.log(res);

    const dialogRef = this.dialog.open(DeleteWorkgroupComponent, {
      data: { name: event.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      //alert(12);
      // console.log(this.child);
      console.log(result);
      if (result == null) {
        this.getEmailWorkgroupList();
        this.messageService.showSuccess('delete message')
      }

    });
  }
  closeModal(item) {
    console.log('parentitem');
    console.log(item);
    this.showCreate = false;
    this.showList = true;
    this.showEdit = false;
    if (item.type == 'save') {
      //this.loaderService.display(true);
      this.getEmailWorkgroupList();
    }
  }
  ViewReport(event)
  {
    const dialogRef = this.dialog.open(ViewReportComponent, {
      data: { name: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
      
    });
  }
}


