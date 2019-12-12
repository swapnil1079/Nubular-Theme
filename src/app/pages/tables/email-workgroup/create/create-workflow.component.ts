import { Component, Output, Input, EventEmitter, TemplateRef } from "@angular/core";
import '../../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';
import { NbDateService } from '@nebular/theme';
import { ValidationService } from "../../../../shared/validators/validation.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { LoaderService } from '../../../../core/@services/loader.service';
import { UserService } from '../../../../core/@services/user.service';
import { MessageService } from '../../../../core/@services/message.service';
import { CrudMessage } from '../../../../core/settings/crudmessage';

@Component({
    selector: 'create-user',
    templateUrl: './create-workflow.component.html'
})

export class CreateWorkFlowComponent {
    error: string = '';
    CreateUserForm: any;
    userModel: any = {};
    timeZoneList: { timeZone: string; ID: number; }[];
    countryCodeList: { Country: string; Code: string; }[];
    userDetail: any;
    EnableSecond: boolean = false;
    @Input() inputArray = [];
    @Output() closeModal = new EventEmitter();
    recurrence = false;
    result: any = [];
    Type: any;
    selected: any;
    secondForm: FormGroup;
    min: Date;
    max: Date;
    constructor(private _fb: FormBuilder, public ValidationService: ValidationService, private messageService: MessageService, private loaderservice: LoaderService, private UserService: UserService, protected dateService: NbDateService<Date>) {
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);

    }
    myForm: FormGroup;
    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            status: ['', Validators.required],
            startTime: ['', Validators.required],
            recurrence: [],
        });
        this.secondForm = this._fb.group({
            items: this._fb.array([
                this.initAddress(),
            ])
        });
        let res = this.UserService.getEmailType();
        if (res) {
            this.Type = res;
            this.selected = this.Type[0];

        }
    }

    initAddress() {
        return this._fb.group({
            EmailType: ['', Validators.required],
            templateName: ['', Validators.required],
            notesDescription: ['', Validators.required],
            name: ['', Validators.required],
            template: this._fb.array([
                this._fb.group({
                    displayFromName: ['', Validators.required],
                    body: ['', [Validators.required]],
                    defaultSubject: ['', Validators.required],
                    locale: ['', Validators.required]
                })
            ]),

            'numberOfDaysToWait': ['', Validators.required],
            'sequentialOrder': ['', Validators.required]
        });
    }

    onFirstSubmit(myForm) {
        this.EnableSecond = true;
        //console.log(this.myForm.value);
    }
    onSecondSubmit() {
        var firstobj = this.myForm.value;
        var secondobject = this.secondForm.value;
        //console.log(this.secondForm.value);
        const CartItems = secondobject.items.map((item) => {
            return {

                sequentialOrder: item.sequentialOrder,
                numberOfDaysToWait: item.numberOfDaysToWait,
                name: item.name,
                notesDescription: item.notesDescription,
                templateName: item.templateName,
                template: item.template

            };
        });
        //         var Catitems=[];
        // for(var i=0; i<secondobject.items.length ; i++){
        //     var tempObj = {
        //         "template":{} //must set this otherwise some other error
        //     };
        //     tempObj["template"]["name"] = secondobject.items[i].EmailType
        //     //tempObj["template"]["somethingElse"] = sobject.items[i].somethingElse

        //     Catitems.push(tempObj);
        // }
        // //console.log(item); //not defined btw
        // console.log(Catitems);
        // console.log(CartItems);
        var item = new Array();
        item["items"] = CartItems;
        var newObject = Object.assign(firstobj, item);
        console.log(newObject);
        
        this.UserService.PostWorkGroup(newObject).subscribe(result => {
            console.log(result);
            if (result) {
                this.closeModal.emit({ page: 'create', type: 'save' });
                this.messageService.showSuccess(CrudMessage.success_insert);
            }
        })
    }
    addAddress() {
        // add address to the list

        const control = <FormArray>this.secondForm.controls['items'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        // remove address from the list
        const control = <FormArray>this.secondForm.controls['items'];
        control.removeAt(i);
    }
    submit() {
        console.log(this.myForm.value);
        // Your form value is outputted as a JavaScript object.
        // Parse it as JSON or take the values necessary to use as you like
    }


    closeModel() {
        this.closeModal.emit({ page: 'create', type: 'back' });
    }
    eventcatch($event) {
        // debugger;
        console.log('catcher');
        console.log($event);
        if ($event.event == false) {
            //  this.initAddress($event.event)  
        }
        else {
            //  this.initAddress($event.event) 
        }
    }
}








