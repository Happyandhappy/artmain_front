import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  loginForm:FormGroup;
  user = null;
  invalidLogin:boolean = false;
  navUrl:string = "";
  submitted:boolean = false;
  error = "";
  constructor( private router:Router, private authService:AuthService, private activateRoute:ActivatedRoute) {}
    
  ngOnInit() {
    // logout in login page
    this.authService.logout();
    // get params from url
    this.navUrl = this.activateRoute.snapshot.queryParams['returnUrl'];

    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    const email = new FormControl('', [Validators.required,Validators.email]);
    const password = new FormControl('',Validators.required);

    this.loginForm = new FormGroup({
      email:email,
      password:password
    });    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.error = "";
    this.invalidLogin = false;
    this.submitted = true;
    if (this.loginForm.invalid){      
      return;
    }else{
      this.authService.login({email:this.f.email.value, password:this.f.password.value})
      .pipe(first())
      .subscribe(
        data => {            
            if (this.navUrl){              
              this.router.navigate([this.navUrl]);            
            } 
            else
              this.router.navigate(['dashboard']);            
        },
        error => {
            this.error = error.error.message;
            console.log(this.error);
            return;
      });
    }    
  }
}
