import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../../core/@services/user.service';

@Component({
    selector: 'locale-address',
    templateUrl: './form-locale-component.html'
})
export class EmailLocaleComponent implements OnInit {
    @Input('group')
    public adressForm: FormGroup;
    Optionmodel: any;
    Optionlocale: any;
    model: any = {};
    defaultlocale = "en_US";
    @Input() itemIndex: number;
    @Output('valuechecker') eventval = new EventEmitter();

    ShowList: boolean = true;

    constructor(private UserService: UserService) { }
    async ngOnInit() {

        this.UserService.lookupapi().subscribe(result => {
            this.Optionlocale = result;
        });
        if (this.itemIndex == 0) {
            this.model.locale = this.defaultlocale;
        }



    }



}

