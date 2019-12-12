import { Component, ViewEncapsulation,TemplateRef,ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LocalDataSource } from 'ng2-smart-table';
// import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
// import {FILE_UPLOAD_DIRECTIVES, FileUploader} from '../../../ng2-file-upload';
import { SmartTableData } from '../../../@core/data/smart-table';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',

  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],

})
export class SmartTableComponent {
  url:any;
  file: File;
  filename: string = '';
  filesArray = [];
  invalidFileMsg: string = '';
  uploadFilebutton: boolean = false;
  public items: any[] = [
    { text: 'Img 1', url: 'https://cdn.pixabay.com/photo/2017/09/01/20/23/ford-2705402__340.jpg' },
    { text: 'Img 2', url: 'https://cdn.pixabay.com/photo/2017/09/24/17/19/cow-2782461__340.jpg' },
    { text: 'cup cakes', url: 'https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_960_720.jpg' }
  ];
  form: FormGroup;
  loading: boolean = false;
  urls = [];
  @ViewChild('fileInput') fileInput: ElementRef;



  constructor(private fb: FormBuilder) {
   
    // const data = this.service.getData();
    // this.source.load(data);
    // this.createForm();

  }

  newid(event) {
    console.log(event);
  }
  // onFilesChange(file: File) {
  //   this.filename = '';
  //   // do stuff here
  //   var validFileExtensions = [".jpg", ".jpeg",".png"];
  //   console.log(file);
  //   if (file != null) {
  //     if (file[0] != undefined) {
  //       this.onChangeuploadFile(file[0], true);
  //     }
  //     else {
  //       this.invalidFileMsg = "Sorry, multiple files are not allowed.";
  //     }

  //   }
  //   else {
  //     // debugger;
  //     this.invalidFileMsg = "Sorrys, " + this.filename + " is invalid, allowed extensions are: " + validFileExtensions.join(", ");
  //   }


  // }
  // destroyFile() {
  //   this.filename = '';
  //   this.file = null;
  //   //this.filename = '';
  //   this.uploadFilebutton = false;
  //   this.invalidFileMsg = '';
  //   (<HTMLInputElement>document.getElementById('fileUpload')).value = "";
  // }
  // onChangeuploadFile(input, dnd) // upload file 
  // {
  //   if (dnd == false) {
  //     this.file = input.target.files[0];
  //   }
  //   else {
  //     this.file = input;
  //   }
  //   console.log(this.file);

  //   var validFileExtensions = [".jpg", ".jpeg",".png"];
  //   console.log(this.file);
  //   // this.file = input.target.files[0];

  //   console.log(this.file);
  //   this.filename = this.file.name;
  //   this.invalidFileMsg = '';
  //   this.uploadFilebutton = false;
  //   var ext = this.file.name.split('.')[1];
  //   console.log(ext)
  //   console.log(this.file);

  //   var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

  //   // if (regex.test(this.filename.toLowerCase())) {
  //   if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
  //     this.uploadFilebutton = true;

  //   }
  //   else {

  //     this.invalidFileMsg = "Sorry, " + this.filename + " is invalid, allowed extensions are: " + validFileExtensions.join(", ");
  //     return false;

  //   }

  //   if (this.file.size >= 2097152)  //in binary 2 mb size limit of file
  //   {
  //     this.invalidFileMsg = "Image size exceed."
  //     return false;
  //   }
  // }
  // uploadFile(template: TemplateRef<any>) {
  //   console.log(template);
  // }
  // onSelectFile(event)
  // {
  //   console.log(event);
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => {
  //       this.url = reader.result;
  //     }
  //   }
  // }

  // createForm() {
  //   this.form = this.fb.group({
  //     // name: ['', Validators.required],
  //     avatar: ['',Validators.required]
  //   });
  // }

  // onFileChange(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       //console.log(reader.result);
  //       var base64 = reader.result;
  //       this.form.get('avatar').setValue({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: (<String>base64).split(',')[1]
  //       })
  //     };
  //   }
  // }

  onSubmit() {
    const formModel = this.form.value;
    console.log(formModel);
    // this.loading = true;
    // // In a real-world app you'd have a http request / service call here like
    // // this.http.post('apiUrl', formModel)
    // setTimeout(() => {
    //   console.log(formModel);
    //   alert('done!');
    //   this.loading = false;
    // }, 1000);
  }

  // clearFile() {
  //   this.form.get('avatar').setValue(null);
  //   this.fileInput.nativeElement.value = '';
  // }

  onSelectFile(event) {
    //var localfilesArray  =  []; 
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                let file = [];
                 file[i] = event.target.files[i];
                reader.onload = (event:any) => {
                  console.log(file[i]);
                   var base64 = event.target.result;
                   this.urls.push(event.target.result);

                    
                   console.log(i);
                    // this.filesArray.push(i);
                   
                }
                this.filesArray.push(event.target.files[i]);
              
                reader.readAsDataURL(event.target.files[i]);
        }
         console.log(this.filesArray);
    }
  }

}
