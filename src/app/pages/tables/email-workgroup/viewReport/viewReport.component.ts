import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
// import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotificationService } from '../../../../core/@services/notification.service'

@Component({
  selector: 'viewReport-add.dialog',
  templateUrl: './viewReport.dialog.html',
  styleUrls: ['./viewReport.dialog.scss']
})

export class ViewReportComponent implements OnInit {
  enable = false;
  list :any = [];
  constructor(public dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private NotificationService: NotificationService
  ) { }
  //myForm: FormGroup;
  
  ngOnInit() {
    console.log(this.data.name);
    this.list.push(this.data.name);
    
  }


  submit(myForm: any) {
    // this.NotificationService.SmsTemplateAdd(myForm.value).subscribe(result => {
    //   this.dialogRef.close(result);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

