import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotificationService } from '../../../../core/@services/notification.service'
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.sms.dialog.html',
  styleUrls: ['./delete.dialog.scss']
})

export class DeleteSmsDialogComponent implements OnInit {
  model: any;
  constructor(public dialogRef: MatDialogRef<DeleteSmsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public ValidationService: ValidationService, private NotificationService: NotificationService
  ) { }


  ngOnInit() {




  }
  delete() {
    // emppty stuff

    this.NotificationService.SmsTemplateDelete(this.data.name).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

