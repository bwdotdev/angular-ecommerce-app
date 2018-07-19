declare var $: any;

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { User } from '../../user';
import { UserService } from '../../user.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit {

  form: any = {
    login: {},
    register: {}
  };

  constructor(private userService: UserService, private authService: AuthenticationService) { }

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
    $('body').on('submitoff', '.login.container .login.form', function (e) {
      e.preventDefault();

      const data: any = {};
      $.each($(this).serializeArray(), function () {
        data[this.name] = this.value;
      });
      console.log(data);

      if (!data.email || !data.password) {
        console.log('NOPE');
      } else {
        console.log(loginComponent.authService.login(data.email, data.password));
      }
    });
  }

  login() {
    console.log(this.authService.login(this.form.login.email, this.form.login.password));
  }

  ngAfterViewInit() {

  }

}
