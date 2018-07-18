declare var $:any;

import { Component, OnInit, AfterViewInit } from '@angular/core';

import { User } from '../../user';
import { UserService } from '../../user.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    $('body').on('focus', '.login.input input', function() {
      $(this).parent().addClass('active');
    });
    $('body').on('blur', '.login.input input', function() {
      $(this).parent().removeClass('active');
    });
    $('body').on('keyup', '.login.input input', function() {
      var $this = $(this);
      if(!$this.val()) {
        $this.parent().removeClass('active');
      } else {
        $this.parent().addClass('active');
      }
    });
    $('body').on('submit', '.login.container .login.form', function(e) {
      e.preventDefault();

      var data:any = {};
      $.each($('form').serializeArray(), function() {
          data[this.name] = this.value;
      });

      if(!data.email || !data.password) {
        console.log('NOPE');
      } else {
        console.log(this.authService.login(data.email, data.password));
      }
    });
  }

  ngAfterViewInit() {
    
  }

}
