import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  authType: String = '';
  title: String = '';

  isSubmitting: boolean = false;

  authForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder : FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      'email':['', Validators.required],
      'password':['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe( data => {

      //Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length-1].path;

      //Set a title for the page
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';

      // Add a form control for username if we are in registration page
      if(this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;

    let credentials = this.authForm.value;
    console.log(credentials);
  }
}
