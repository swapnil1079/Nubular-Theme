import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../../core/@services/user.service';

@Component({
    selector: 'template-details-fields',
    templateUrl: './form-edit-component.html'
})
export class EmailTemplateEditSubComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() item: any;
    @Input() itemIndex: number;
    @Input() groups: any;
    ShowOption: string;
    Optionmodel: any;
    namereadonly: boolean;
    Optionlocale: any;
    model: any;
    readonlyfields: boolean
    constructor(private UserService: UserService) { }
    async ngOnInit() {
        this.model = {};
        //this.namereadonly = true;


        //console.log(this.form.controls['cars']['controls'][0].controls.details.controls.name);
        //console.log(JSON.stringify(this.form));
         console.log(this.groups);

        //console.log(this.form.controls['items'].value[this.itemIndex]);
        // this.UserService.lookupapi().subscribe(result => {
        //     this.Optionlocale = result;

        // });




    }
    async SelectedOption($event) {
        console.log($event.target.value);
        if ($event.target.value == "Create New") {


            this.model = {};
            this.form.controls['items'].value[this.itemIndex] = {};
            this.namereadonly = false;
            console.log(this.model.name)
        }
        else {
            this.UserService.getTemplateByName($event.target.value).subscribe(result => {
                this.namereadonly = true;
                this.model = result;
            });
        }
    }

}