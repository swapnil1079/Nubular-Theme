import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../shared/validators/validation.service';

@Component({
  selector: 'show-errors',
  template: `<div class="text-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ShowErrorsComponent {
  @Input() control: FormControl;
  constructor() { }


  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && propertyName == 'required' && this.control.touched) {

        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
      if (this.control.errors.hasOwnProperty(propertyName) && propertyName != 'required' && this.control.value) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      } else {
        return null;
      }
    }
    return null;
  }
}