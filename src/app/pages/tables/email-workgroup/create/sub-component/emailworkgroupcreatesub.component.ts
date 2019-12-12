import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../../core/@services/user.service';

@Component({
    selector: 'address',
    templateUrl: './form-sub-component.html'
})
export class EmailWorkGroupCreateSubComponent implements OnInit {
    @Input('group')
    public adressForm: FormGroup;
    Optionmodel: any;
    Optionlocale: any;
    isreadonly: boolean;
    model: any;
    currentPage = 1;
    @Input() itemIndex: number;
    @Input() newgroup: any;

    @Output('valuechecker') eventval = new EventEmitter();
    useExisting: boolean;
    ShowList: boolean = false;
    ShowOption: boolean = true;
    constructor(private UserService: UserService, private _fb: FormBuilder) { }
    async ngOnInit() {
        console.log(this.itemIndex);
        console.log(this.newgroup['controls'][this.itemIndex])

        console.log(this.newgroup['controls'][this.itemIndex].controls['template']);
        let res = await this.UserService.getAllEmailTemplate(this.currentPage);
        if (res) {
            this.Optionmodel = res;
        }



    }
    clickevent(event) {


        if (event == true) {
            this.eventval.emit({ event: true });
            this.ShowList = false;
        }
        else {
            this.eventval.emit({ event: false });
            this.ShowList = true;
        }
    }

     async SelectedOption($event) {
        console.log(this.newgroup['controls'][this.itemIndex].controls['template']);
       
        if ($event.target.value == "Create New") {

            this.ShowList = true;
            if(this.newgroup['controls'][this.itemIndex].controls['template'].length>1)
            {
                
                var tlength = this.newgroup['controls'][this.itemIndex].controls['template'].length
                for (var i = 0; i < tlength; i++) {
                const control = this.newgroup['controls'][this.itemIndex].controls['template'];
                control.removeAt(i);
                }
                
            }
            this.model = {
                'name': '',
                'templateName': '',
                'notesDescription': '',
                'template': [{
                    'locale': 'en_US',
                    'displayFromName': '',
                    'body': '',
                    'defaultSubject': '',
                }]
            }

            this.isreadonly = false;
            if (this.itemIndex == 0) {
                this.model.numberOfDaysToWait = 0;
                this.model.sequentialOrder = 1;
                console.log(this.model);

            }
            else {
                this.model.sequentialOrder = this.itemIndex + 1;
            }
        }
        else {

            var name = $event.target.value.split(": ")[1]
            
            this.ShowList = true;
            this.isreadonly = true;
            this.UserService.getTemplateByName(name).subscribe(result => {
                if(this.newgroup['controls'][this.itemIndex].controls['template'].length>1)
                {
                    var tlength = this.newgroup['controls'][this.itemIndex].controls['template'].length
                    for (var i = 0; i < result.template.length; i++) {
                    const control = this.newgroup['controls'][this.itemIndex].controls['template'];
                    control.removeAt(i);
                    }
                    
                }
                this.model = result;
                this.model.name = result.name;
                
                for (var i = 0; i < result.template.length; i++) {
                    
                    if (i != 0) {
                        const control = this.newgroup['controls'][this.itemIndex].controls['template'];
                        control.push(this.initAddress2());
                    }

                }
                
                if (this.itemIndex == 0) {

                    this.model.numberOfDaysToWait = 0;
                    this.model.sequentialOrder = 1;
                    //console.log(this.model);

                }
                else {
                    this.model.sequentialOrder = this.itemIndex + 1;
                }

            });
        }
        this.UserService.lookupapi().subscribe(result => {
            this.Optionlocale = result;
        });

    }
    
    initAddress2() {
        return this._fb.group({
            displayFromName: ['', Validators.required],
            body: ['', [Validators.required]],
            defaultSubject: ['', Validators.required],
            locale: ['', Validators.required]
        })

    }
    addAddress1() {

        const control = this.newgroup['controls'][this.itemIndex].controls['template'];
        console.log(control);
        control.push(this.initAddress1());
        //console.log(control);
        this.model.template[control.length - 1] = {};

    }
    initAddress1() {
        return this._fb.group({
            displayFromName: ['', Validators.required],
            body: ['', [Validators.required]],
            defaultSubject: ['', Validators.required],
            locale: ['', Validators.required]
        })

    }
    localeevent($event, index) {
        console.log(index);
        console.log($event.target.value);
        console.log(this.model.name);
        if (this.model.name != 'Create New') {
            this.UserService.getTemplateByName(this.model.name)
                .subscribe(data => {
                    console.log(data.template)
                    for (var i = 0; i < data.template.length; i++) {
                        if (data.template[i].locale == $event.target.value) {
                            console.log('if');
                            this.model.template[index] = data.template[i];
                            break;
                        }
                        else {
                            console.log('else');
                            this.model.template[index] = {
                                'locale': $event.target.value,
                                'displayFromName': '',
                                'body': '',
                                'defaultSubject': '',
                            };
                        }
                    }
                });
        }
    }
    removeAddress1(i: number) {
        // remove address from the list
        const control = this.newgroup['controls'][this.itemIndex].controls['template'];
        control.removeAt(i);
    }
}