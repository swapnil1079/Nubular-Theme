import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotificationService } from '../../../../core/@services/notification.service'

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.sms.dialog.html',
  styleUrls: ['./add.dialog.scss']
})

export class AddSmsDialogComponent implements OnInit {
  enable = false;
  constructor(public dialogRef: MatDialogRef<AddSmsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModel, private fb: FormBuilder, public ValidationService: ValidationService, private NotificationService: NotificationService
  ) { }
  myForm: FormGroup;
  
  ngOnInit() {
    this.myForm = this.fb.group({
      'name': ['', [Validators.required]],
      'body': ['', [Validators.required]],
      'originator': ['', [Validators.required]],
      'active': []
    });
  }


  submit(myForm: any) {
    this.NotificationService.SmsTemplateAdd(myForm.value).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

