import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm : FormGroup;
  submitted:boolean = false;
  message:string = "";
  constructor(private authService:AuthService) { }

  ngOnInit() {
    const email = new FormControl('', [Validators.required,Validators.email]);
    this.forgotForm = new FormGroup({
      email:email
    });
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onSubmit(){    
    this.submitted = true;
    if (this.forgotForm.valid){
      alert("ok")
    }
    return;
  }

}
