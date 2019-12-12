import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../core/@services/login-service.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { ValidationService } from "../../shared/validators/validation.service";
import{UserStorageService} from "../../core/@services/UserStorage.service";
import {Router} from '@angular/router';



@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private Loginservice: LoginServiceService,private fb: FormBuilder,ValidationService:ValidationService, private store:UserStorageService,private router:Router) { }
    myForm: FormGroup;
    RegisterForm: FormGroup;
    loginform:boolean = true;
    registerform:boolean = false;

  ngOnInit() {
    //this.store.SetUserResponse(1160);
    this.myForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', Validators.required]
    });

    
  }
  login(myForm:any) {
    // console.log(this.store.GetUserResponse());
    // console.log('Registration successful.');
    this.Loginservice.getLogin(myForm.value.username,myForm.value.password).subscribe(result=>{
      console.log(result);
     this.store.SetToken(result.token);
      this.store.SetUserDetails(myForm.value.username);
      this.router.navigate(['/pages/dashboard']);
    })
    // console.log(myForm.value);
  }
  registerblock()
  {
    this.loginform= false;
    this.RegisterForm = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'username': ['', [Validators.required]],
      'password': ['', Validators.required]
    });
    this.registerform = true;
    
  }
  loginblock()
  {
    this.registerform = false;
    this.loginform = true;
  }
  register(RegisterForm:any)
  {
    this.Loginservice.getRegister(RegisterForm.value.username,RegisterForm.value.password,RegisterForm.value.firstName,RegisterForm.value.lastName).subscribe(result=>{
      console.log(result);
      this.registerform = false;
      this.loginform = true;
    })
  }

}
