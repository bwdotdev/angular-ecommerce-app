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

  lForm: FormGroup;
  lUser: {
    username: string,
    password: string
  };

  rForm: FormGroup;
  rUser: {
    username: string,
    password: string,
    cpassword: string
  };

  error: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.lForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.rForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      passwords: fb.group({
        password: [null, [Validators.required, Validators.minLength(7)]],
        cpassword: [null, [Validators.required]]
      }, {validator: this.matchValidator})
    });
  }

  matchValidator(fg: FormGroup) {
    var valid = false;

    var lastVal = null;
    for (var name in fg.controls) {
      var val = fg.controls[name].value
      if(!lastVal) lastVal = val;

      if(lastVal !== val) return { mismatch: true }
    }
  
    return null;
  }

  ngOnInit() {
    const loginComponent = this;
    $('body').on('focus', '.login.input input', function () {
      $(this).parent().addClass('active');
    });
    $('body').on('blur', '.login.input input', function () {
      $(this).parent().removeClass('active');
    });
    $('body').on('keyup', '.login.input input', function () {
      $(this).parent().addClass('active');
    });
    // $('body').on('submitoff', '.login.container .login.form', function (e) {
    //   e.preventDefault();

    //   const data: any = {};
    //   $.each($(this).serializeArray(), function () {
    //     data[this.name] = this.value;
    //   });
    //   console.log(data);

    //   if (!data.email || !data.password) {
    //     console.log('NOPE');
    //   } else {
    //     console.log(loginComponent.authService.login(data.email, data.password));
    //   }
    // });
  }

  async login(user) {
    if(!this.lForm.valid) {
      this.error = 'Please enter your username and password.';
      return;
    }

    this.authService.login(user).then(loggedInUser => {
      this.router.navigateByUrl('account');
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

  async register(user) {

  }

  ngAfterViewInit() {

  }

}
