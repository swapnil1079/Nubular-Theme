import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { DataModel } from '../model/data.model'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../core/@services/user.service'
import { LoaderService } from '../../../../core/@services/loader.service'
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.scss']
})

export class EditDialogComponent implements OnInit {
  model: any = {};
  selected: any;
  Optionmodel: any;
  template: any;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public ValidationService: ValidationService, private UserService: UserService, private loaderservice: LoaderService
  ) { }
  myForm: FormGroup;

  ngOnInit() {
    //console.log(this.data.model);
    this.model = this.data.model
    // this.UserService.getTemplateByName(this.data.model.name).subscribe(result => {
    // //  console.log(result);
    //   this.model = result;
    //   //this.selected = this.model.locale;
    // });
    //console.log(this.model);
    // this.myForm = this.fb.group({
    //   'name': ['', [Validators.required]],
      
    //   'active': [],
    //   'confidential': [],
     

    // });
    // this.UserService.lookupapi().subscribe(result=>{
    //   this.Optionmodel = result;

    // });
    // let res = await this.UserService.getTemplateByName(this.data.name);
    // if (res) {
    //   console.log(res)
    //   this.model = res;

    // }
    this.template = this.model.template;
    //console.log(this.template);
    this.myForm = this.setUpForm(this.model.template);
    this.myForm.patchValue(this.model.template);

    this.loaderservice.show();
    setTimeout(() => {
      this.loaderservice.hide()
    }, 3000)

  }

  setUpForm(template: any[]) {
    console.log(template);
    return new FormGroup({
      
      template: new FormArray(template.map((item) => this.createTemplate(item)))
    });
  }
  get TemplateArray() {
    return (this.myForm.get('template') as FormArray);
  }

  addNewTemplate() {
    const newTemplate = {
      // body: '',
      // defaultSubject: '',
      displayFromName: '',
      // locale: '',
      
    }
    this.template.splice(this.TemplateArray.length, 1, newTemplate);
    this.TemplateArray.insert(this.TemplateArray.length, this.createTemplate(newTemplate))
  }
  removeAddress(i) {

    this.TemplateArray.removeAt(i);
    this.template.splice(i, 1);
  }

  createTemplate(item: any) {
    console.log(item);
    return new FormGroup({
      
      // defaultSubject: new FormControl(item.defaultSubject, Validators.required),
      displayFromName: new FormControl(item.displayFromName, Validators.required),
      // body: new FormControl(item.body, Validators.required),
      // locale: new FormControl(item.locale, Validators.required),
      
    })
  }


  update() {
    //console.log(this.model);
    this.UserService.UpdateEmailTemplateByName(this.model, this.data.name).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // public confirmAdd(): void {
  //   // this.dataService.addIssue(this.data);
  //   console.log(this.data);
  // }
}

