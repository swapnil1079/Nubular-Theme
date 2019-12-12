import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../../core/@services/user.service';

@Component({
    selector: 'app-details-fields',
    templateUrl: './form-editsub-component.html'
})
export class EmailWorkGroupEditSubComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() item: any;
    @Input() status: string;
    @Input() itemIndex: number;
    @Input() groups: any;
    ShowOption: string;

    Optionmodel: any;
    namereadonly: boolean;
    Optionlocale: any;
    model: any;
    readonlyfields: boolean
    constructor(private UserService: UserService, private _fb: FormBuilder) { }
    async ngOnInit() {
        
        this.namereadonly = true;
        console.log(this.form.controls['items']);
        console.log('this.form.controls');
        this.UserService.lookupapi().subscribe(result => {
            this.Optionlocale = result;

        });

        if (this.form.controls['items'].value[this.itemIndex].templateDiv == 'show') {
            this.ShowOption = "show";
            let res = await this.UserService.getAllEmailTemplate(1);
            if (res) {
                this.Optionmodel = res;
                
            }


        }
        if (this.status != 'DRAFT' && this.form.controls['items'].value[this.itemIndex].templateDiv != 'show') {
            //alert(12)
            this.readonlyfields = true;
        }
        else {
            this.readonlyfields = false;
        }


    }
    async SelectedOption($event) {
        console.log($event.target.value);
        if ($event.target.value == "Create New") {
            if (this.form.controls['items']['controls'][this.itemIndex].controls['template'].length > 1) {
                    
                var tlength = this.form.controls['items']['controls'][this.itemIndex].controls['template'].length
                for (var i = tlength; i > 0; i--) {
                    debugger;
                    const control = this.form.controls['items']['controls'][this.itemIndex].controls['template'];
                    control.removeAt(i);
                }

            }
            this.model = {
                'name': 'New template',
                'templateName': '',
                'notesDescription': '',
                'template': [{
                    'locale': 'en_US',
                    'displayFromName': '',
                    'body': '',
                    'defaultSubject': '',
                }]
            }
            //this.form.controls['items'].value[this.itemIndex] = {};
            this.namereadonly = false;
            //console.log(this.model.name)
        }
        else {
            var name = $event.target.value.split(": ")[1]
            this.UserService.getTemplateByName(name).subscribe(result => {
                this.namereadonly = true;
                this.model = result;
                //this.form.controls['items'].value[this.itemIndex] = result;
                console.log(result);
                //this.model = result;
                //this.model.name = result.name;
                //this.form.controls['items']['controls'][this.itemIndex] = {};
                // this.form.controls['items'].value[this.itemIndex] =
                //     {
                //         'name': result.name,
                //         'numberOfDaysToWait': 3,
                //         'sequentialOrder': 12,
                //         'templateName': 'dsad',
                //         'notesDescription': 'asdsadsd',
                //         'template': result.template,
                        


                //     }
                // this.form.controls['items']['controls'][this.itemIndex] = new FormGroup({

                //     'name': new FormControl(result.name, Validators.required),
                //     'numberOfDaysToWait': new FormControl('', Validators.required),
                //     'sequentialOrder': new FormControl(3, Validators.required),
                //     'notesDescription': new FormControl('', Validators.required),
                //     'templateName': new FormControl('', Validators.required),
                //     'template': new FormArray(result.template.map((item) => this.createTemplate(item))),

                    
                // });
                if (this.form.controls['items']['controls'][this.itemIndex].controls['template'].length > 1) {
                    debugger;
                var tlength = this.form.controls['items']['controls'][this.itemIndex].controls['template'].length
                for (var i = 0; i < tlength; i++) {
                    const control = this.form.controls['items']['controls'][this.itemIndex].controls['template'];
                    control.removeAt(i);
                }

            }

                for (var i = 0; i < result.template.length; i++) {
                   
                        this.form.controls['items']['controls'][this.itemIndex].controls['template']['controls'][i] =

                            new FormGroup({
                                displayFromName: new FormControl(result.template[i].displayFromName, Validators.required),
                                body: new FormControl(result.template[i].body, Validators.required),
                                defaultSubject: new FormControl(result.template[i].defaultSubject, Validators.required),
                                locale: new FormControl(result.template[i].locale, Validators.required),

                            });

                        this.form.controls['items'].value[this.itemIndex]['template'][i] =
                            {
                                'displayFromName': result.template[i].displayFromName,
                                'body': result.template[i].body,
                                'defaultSubject': result.template[i].defaultSubject,
                                'locale': result.template[i].locale

                            }

                        // console.log(this.form.controls['items'].value[this.itemIndex]['template'][index]);
                        // console.log(this.form.controls['items']['controls'][this.itemIndex].controls['template'].controls[index]);
                        
                   
                }

                
               // this.model = result;
                //this.model.name = result.name;
                //console.log(this.form.controls['items'].value[this.itemIndex]);
                // this.form.controls['items'].value[this.itemIndex].name = result.name
                console.log('inselec');
                console.log(this.form.controls['items']);

            });
        }


    }
    createTemplate(item: any) {


        return new FormGroup({
            displayFromName: new FormControl('templates.displayFromName', Validators.required),
            body: new FormControl('templates.body', Validators.required),
            defaultSubject: new FormControl('templates.defaultSubject', Validators.required),
            locale: new FormControl(item.locale, Validators.required),

        });
    }

    addAddress1() {
        
        const control = this.form.controls['items']['controls'][this.itemIndex].controls['template'];
        
        control.push(this.initAddress1());
        
        this.form.controls['items']['controls'][this.itemIndex].controls['template'][control.length - 1] = {
            'locale': 'en_US',
            'displayFromName': '',
            'body': '',
            'defaultSubject': '',

        };
        

    }
    initAddress1() {
        return new FormGroup({
            displayFromName: new FormControl('', Validators.required),
            body: new FormControl('', Validators.required),
            defaultSubject: new FormControl('', Validators.required),
            locale: new FormControl('en_US', Validators.required),

        });
    }

    localeevent($event, index, name) {
        console.log(index);
        console.log($event.target.value);

        //console.log(this.model.name);
        if (name != 'Create New') {
            this.UserService.getTemplateByName(name)
                .subscribe(data => {
                    // console.log(data.template)
                    for (var i = 0; i < data.template.length; i++) {
                        if (data.template[i].locale == $event.target.value) {
                            this.form.controls['items']['controls'][this.itemIndex].controls['template']['controls'][index] =

                                new FormGroup({
                                    displayFromName: new FormControl(data.template[i].displayFromName, Validators.required),
                                    body: new FormControl(data.template[i].body, Validators.required),
                                    defaultSubject: new FormControl(data.template[i].defaultSubject, Validators.required),
                                    locale: new FormControl(data.template[i].locale, Validators.required),

                                });

                            this.form.controls['items'].value[this.itemIndex]['template'][index] =
                                {
                                    'displayFromName': data.template[i].displayFromName,
                                    'body': data.template[i].body,
                                    'defaultSubject': data.template[i].defaultSubject,
                                    'locale': data.template[i].locale

                                }

                            console.log(this.form.controls['items'].value[this.itemIndex]['template'][index]);
                            console.log(this.form.controls['items']['controls'][this.itemIndex].controls['template'].controls[index]);
                            break;
                        }
                        else {
                            this.form.controls['items'].value[this.itemIndex]['template'][index] = {
                                'displayFromName': ' ',
                                'body': ' ',
                                'defaultSubject': ' ',
                                'locale': $event.target.value
                            };
                        }
                    }
                });
        }
    }


    removeAddress1(i: number) {
        // remove address from the list
        const control = this.form.controls['items']['controls'][this.itemIndex].controls['template']
        control.removeAt(i);
    }



}