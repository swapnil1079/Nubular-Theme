import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotificationService } from '../../../../core/@services/notification.service'
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.sms.dialog.html',
  styleUrls: ['./edit.dialog.scss']
})

export class EditSmsDialogComponent implements OnInit {
  model: any;
  constructor(public dialogRef: MatDialogRef<EditSmsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public ValidationService: ValidationService, private NotificationService: NotificationService
  ) { }
  myForm: FormGroup;

   ngOnInit() {
     this.NotificationService.getTemplateByName(this.data.name).subscribe(result => {
     this.model = result;
    });

    this.myForm = this.fb.group({
      'name': ['', [Validators.required]],
      'body': ['', [Validators.required]],
      'originator': ['', [Validators.required]],
      'active': [],
    });
    
  }
  update(myForm: any) {
    // emppty stuff

    this.NotificationService.UpdateSmsTemplateByName(this.model,this.data.name).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

