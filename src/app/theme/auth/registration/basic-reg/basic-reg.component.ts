import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { MustMatch } from '../../../../shared/utils/must-match.validator';
import {AuthService} from '../../../../services/auth/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {
  registerForm: FormGroup;
  message : string = "";
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit() {    
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
      // register form validation
        this.registerForm = this.formBuilder.group({
                firstname : ['', Validators.required],
                lastname  : ['', Validators.required],
                // username  : ['', Validators.compose([Validators.required, Validators.minLength(3)])],      
                email     : ['', Validators.compose([Validators.required, Validators.email])],
                password  : ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                confirmPassword : ['', Validators.required],
                termCondition   : [false, Validators.required]
          }, {
                validator: MustMatch('password', 'confirmPassword')
          });
  }
  
  get f() { return this.registerForm.controls; }

  SignUp(){
      this.submitted = true;
      this.message = "";
      // stop here if form is invalid
      if (this.registerForm.valid) {
        console.log(this.registerForm.controls);
        const userinfor = {
                              first_name:this.f.firstname.value,
                              last_name : this.f.lastname.value,
                              // username: this.f.username.value,
                              email: this.f.email.value,
                              password:this.f.password.value
        };
        // regist to server and get response
        this.authService.register(userinfor)
        .pipe(first())
        .subscribe(
          data => {
            // after registration, navigate to login page
            this.router.navigate(['/auth/login']);
          },
          error => {
            if (error.error){
               if (error.error.username){
                 this.message = error.error.username[0];
               }else if(error.error.error){
                this.message = error.error.error[0];
               }
            }
            return;
          }
        )
      }
  }
}
