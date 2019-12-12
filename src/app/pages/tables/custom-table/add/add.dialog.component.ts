import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../core/@services/user.service'
import { LoaderService } from '../../../../core/@services/loader.service'
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.scss']
})

export class AddDialogComponent implements OnInit {
  active: true;
  confidential: false;
  model: any = {};
  Defaultlocale = "en_US";
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModel, private fb: FormBuilder, public ValidationService: ValidationService, private UserService: UserService, private loaderservice: LoaderService
  ) { }
  myForm: FormGroup;
  ngOnInit() {
    //this.loaderservice.show();
    this.model.active = true;
    this.model.confidential = false;
    this.myForm = this.fb.group({
      'name': ['', [Validators.required]],
      'active': [],
      'confidential': [],
      'template': this.fb.array([
        this.initLocalTemplate(),
      ])

    });


    // setTimeout(() => {
    //   this.loaderservice.hide()
    // }, 3000)
    // this.UserService.lookupapi().subscribe(result => {
    //   this.Optionmodel = result;
    // });

  }
  get gettemplate() {
    return this.myForm.get('template')['controls'];
  }
  initLocalTemplate() {
    return this.fb.group({
      'defaultSubject': ['', [Validators.required]],
      'locale': ['', Validators.required],
      'displayFromName': ['', [Validators.required]],
      'body': ['', [Validators.required]],

    });
  }
  addAddress() {
    // add template to the list

    const control = <FormArray>this.myForm.controls['template'];
    control.push(this.initLocalTemplate());
    // console.log(control);
  }

  removeAddress(i: number) {
    // remove template from the list
    const control = <FormArray>this.myForm.controls['template'];
    control.removeAt(i);
  }


  submit(myForm: any) {
    console.log(myForm.value);
    this.UserService.EmailTemplateAdd(myForm.value).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

