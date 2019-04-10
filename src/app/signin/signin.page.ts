import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signInForm: FormGroup;

  constructor(
    private authService:AuthService, 
    private formBuilder:FormBuilder, 
    private router:Router 
  ) { }

  ngOnInit() {
    //attach reactive forms module to the form and grabbing the field from it
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ]
    });
  }
  
  signIn( formData ){
    this.authService.signIn(formData.email, formData.password)
    .then( (response)=> { 
      console.log(response);
      //successful
      this.router.navigate(['/home']);
      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
