import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../core/@services/user.service'


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.scss']
})

export class DeleteWorkgroupComponent implements OnInit {
  model: any;
  constructor(public dialogRef: MatDialogRef<DeleteWorkgroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public ValidationService: ValidationService, private UserService: UserService
  ) { }


  ngOnInit() {




  }
  delete() {
    // emppty stuff

    this.UserService.EmailGroupTemplateDelete(this.data.name).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

