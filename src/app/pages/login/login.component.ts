declare var $: any;

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';
import { UserService } from '../../user.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formType: string;

  lrForm: FormGroup;
  lrUser: {
    username: string,
    password: string,
    cpassword?: string
  };

  error: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.lrForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      cpassword: [null]
    });
  }

  ngOnInit() {
    $('body').on('focus', '.login.input input', function () {
      $(this).parent().addClass('active');
    });
    $('body').on('blur', '.login.input input', function () {
      $(this).parent().removeClass('active');
    });
    $('body').on('keyup', '.login.input input', function () {
      $(this).parent().addClass('active');
    });

    if(this.authService.loggedIn()) this.router.navigateByUrl('account');
  }

  async loginOrRegister(user) {
    // if(!this.formType) return;

    if(!this.lrForm.valid) {
      if(this.lrForm.controls.email.status !== 'VALID') this.error = 'Invalid email address';
      else if(this.lrForm.controls.password.status !== 'VALID') this.error = 'Invalid password';
      else if(this.lrForm.controls.cpassword.status !== 'VALID') this.error = 'Invalid password';
      else this.error = 'Please enter your username and password.';
      return;
    }
    this.error = '';

    if(this.formType === 'login') {
      this.authService.login(user).then(loggedInUser => {
        this.router.navigateByUrl('account');
        console.log(loggedInUser);
      }).catch(error => {
        if(error.status && error.status === 422) {
          this.error = 'Sorry, those details are incorrect.';
        } else if(error.status && error.status === 418) {
          return;
        } else {
          this.error = 'An unknown error occurred.';
        }
      });
    } else {
      if(user.password !== user.cpassword) {
        this.error = 'Sorry, those passwords do not match.';
        return;
      }
      delete user.cpassword;

      this.authService.register(user).then(registeredUser => {
        this.router.navigateByUrl('account');
        console.log(registeredUser);
      }).catch(error => {
        if(error.status && error.status === 422) {
          this.error = 'Sorry, those details are incorrect.';
        } else if(error.status && error.status === 418) {
          return;
        } else {
          this.error = 'An unknown error occurred.';
        }
      });
    }
  }

  async register(user) {

  }

  async checkEmail(email) {
    if(email) {
      const emailExists = await this.authService.emailExists(email);
      this.formType = emailExists ? 'login' : 'register';
    }
  }

  ngAfterViewInit() {

  }

}
