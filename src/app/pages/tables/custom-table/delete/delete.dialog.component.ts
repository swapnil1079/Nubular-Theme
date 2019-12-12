import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../core/@services/user.service'
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.scss']
})

export class DeleteDialogComponent implements OnInit {
  model: any;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public ValidationService: ValidationService, private UserService: UserService
  ) { }


  ngOnInit() {}
  
  delete() {
    this.UserService.EmailTemplateDelete(this.data.name).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

