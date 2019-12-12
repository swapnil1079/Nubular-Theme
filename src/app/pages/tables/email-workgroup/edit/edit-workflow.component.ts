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
    selector: 'edit-user',
    templateUrl: './edit-workflow.component.html'
})

export class EditWorkFlowComponent {
    error: string = '';
    CreateUserForm: any;
    EnableSecond: boolean = false;
    timeZoneList: { timeZone: string; ID: number; }[];
    countryCodeList: { Country: string; Code: string; }[];
    userDetail: any;
    @Input() userModel: any;
    @Output() closeModal = new EventEmitter();
    result: any = [];
    Type: any;
    selected: any;
    secondForm: FormGroup;
    min: Date;
    max: Date;
    items: any
    selectedMoments: any;
    constructor(private _fb: FormBuilder, public ValidationService: ValidationService, private loaderservice: LoaderService, private messageService: MessageService, private UserService: UserService, protected dateService: NbDateService<Date>) {
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);

    }
    myForm: FormGroup;
    ngOnInit() {
        this.selectedMoments = new Date(this.userModel.startTime);
        this.items = this.userModel.items;
        this.myForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            status: ['', Validators.required],
            startTime: ['', Validators.required],
            recurrence: [],
        });

        let res = this.UserService.getEmailType();
        if (res) {
            //this.Type = res;
            if (this.userModel.status != "DRAFT") {
                this.removeByAttr(res, 'name', 'DRAFT');
                this.Type = res;
            }
            else {
                this.Type = res;
            }
            this.selected = this.userModel.status;

        }
        this.secondForm = this.setUpForm(this.userModel.items);
        this.secondForm.patchValue(this.userModel.items);
    }

    setUpForm(items: any[]) {
        return new FormGroup({
            items: new FormArray(items.map((item) => this.createCar(item)))
        });
    }
    removeByAttr(arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }

    get carsFormArray() {
        return (this.secondForm.get('items') as FormArray);
    }
    addNewTemplate() {
        const newCar = {
            EmailType :'',
            name: '',
            numberOfDaysToWait: '',
            sequentialOrder: '',
            notesDescription: '',
            templateName: '',
            templateDiv: 'show',
            template: [
                {
                    displayFromName: '',
                    body: '',
                    defaultSubject: '',
                    locale: 'en_US'
                }
            ]

        }
        this.items.splice(this.carsFormArray.length, 1, newCar);
        this.carsFormArray.insert(this.carsFormArray.length, this.createCar(newCar))
    }
    removeAddress(i) {

        this.carsFormArray.removeAt(i);
        this.items.splice(i, 1);
    }

    createCar(item: any) {
        return new FormGroup({
            EmailType: new FormControl(' ', Validators.required),
            name: new FormControl(item.name, Validators.required),
            numberOfDaysToWait: new FormControl(item.numberOfDaysToWait, Validators.required),
            sequentialOrder: new FormControl(item.sequentialOrder, Validators.required),
            notesDescription: new FormControl(item.notesDescription, Validators.required),
            templateName: new FormControl(item.templateName, Validators.required),
            template: new FormArray(item.template.map((item) => this.templateStructure(item))

            ),


            templateDiv: new FormControl(item.templateDiv ? item.templateDiv : '')
        })
    }
    templateStructure(templates) {

        return new FormGroup({
            displayFromName: new FormControl(templates.displayFromName, Validators.required),
            body: new FormControl(templates.body, Validators.required),
            defaultSubject: new FormControl(templates.defaultSubject, Validators.required),
            locale: new FormControl(templates.locale, Validators.required),

        });
    }
    eventchange($event) {
        this.EnableSecond = false;
    }


    onFirstSubmit(myForm) {
        this.EnableSecond = true;
        console.log(this.myForm.value);
    }
    onSecondSubmit() {
        var firstobj = this.myForm.value;
        var secondobject = this.secondForm.value;
        firstobj.recurrence = true;
        secondobject.items.map(function (item) {
            delete item.templateDiv;
            return item;
        });
        var newObject = Object.assign(firstobj, secondobject);
        this.UserService.UpdateWorkGroup(newObject, this.userModel.name).subscribe(result => {
            //console.log(result);
            if (result) {
                this.closeModal.emit({ page: 'update', type: 'save' });
                this.messageService.showSuccess(CrudMessage.success_update);
            }
        })
    }
    submit() {
        console.log(this.myForm.value);

    }
    closeModel() {
        this.closeModal.emit({ page: 'create', type: 'back' });
    }
    eventcatch($event) {
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








