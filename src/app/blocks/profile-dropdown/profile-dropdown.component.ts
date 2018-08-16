import { Component, OnInit, ElementRef } from '@angular/core';

import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.less'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProfileDropdownComponent implements OnInit {

  authService: AuthenticationService;
  open: boolean = false;

  constructor(authService: AuthenticationService, private _eref: ElementRef) {
    this.authService = authService;
  }

  ngOnInit() {
  }

  toggleDropdown() {
    this.open ? this.closeDropdown() : this.openDropdown();
  }

  closeDropdown() {
    this.open = false;
  }

  openDropdown() {
    this.open = true;
  }

  onClick(event) {
    if(this.open && !this._eref.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

}
