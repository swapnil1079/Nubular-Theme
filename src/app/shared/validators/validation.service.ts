import { Injectable } from '@angular/core'

@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': () => 'This Field is Required',
            'invalidEmailAddress': () => `${validatorValue.message}`,
            'invalidPassword': () => 'Password must be alphanumeric with one special character and one capital letter.',
            'invalidRegistrationNumber': (params) => 'Please use between 4 and 12 alphanumeric characters.',
            'minlength': () => `Minimum length ${validatorValue.requiredLength}`,
            'invalidIMEI': () => 'Invalid IMEI',
            'invalidVIN': () => 'VIN may contain 17 digits and letters only, excluding I,O,Q.'
        };
        return config[validatorName]();
    }

    static emailValidator(control) {

        // RFC 2822 compliant regex
        if (control.value) {
            const isValidPhoneNumber = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(control.value);
            const message = {
                'message': 'Email id is not valid'
            };
            return isValidPhoneNumber ? null : { 'invalidEmailAddress': message };
            // }
        }
    }
    static passwordValidator(control) {
        //(?=.*[a-z])// use positive look ahead to see if at least one lower case letter exists
        // (?=.*[A-Z])// use positive look ahead to see if at least one upper case letter exists
        // (?=.*\d)// use positive look ahead to see if at least one digit exists
        // (?=.*\W])// use positive look ahead to see if at least one non-word character exists
        //\W might be a bit broad. I'd replace it with a character set like this: [-+_!@#$%^&*.,?]
        if (control.value) {
            if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_-])/)) {
                return null;
            } else {
                return { 'invalidPassword': true };
            }
        }
    }

    static registrationNumberValidator(control) {
        if (control.value) {
            if (control.value.match(/^[a-zA-Z0-9]{4,12}$/)) {//ng-pattern="/^[a-zA-Z0-9]{4,12}$/"
                return null;
            } else {
                return { 'invalidRegistrationNumber': true };
            }
        }
    }

    static vinValidator(control) {
        if (control.value) {
            if (control.value.match(/^[0-9a-hj-npr-z]{17}$/i)) {//ng-pattern="/^[0-9a-hj-npr-z]{17}$/i
                return null;  ///^[A-Za-z][^IOQioq]{17}$/
            } else {
                return { 'invalidVIN': true };
            }
        }
    }

    static isIMEI(control) {

        if (control.value) {
            if (control.value.match(/^\d{15,20}$/)) {
                return null;
            } else {
                return { 'invalidIMEI': true };
            }
        }
    }
}

