import { Component, OnInit, ElementRef } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.less'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class CurrencyDropdownComponent implements OnInit {

  open: boolean = false;

  constructor(private userService: UserService, private _eref: ElementRef) { }

  ngOnInit() { }

  setCurrency(elem) {
    this._eref.nativeElement.querySelector('#selectedCurrency').setAttribute("class", elem.querySelector('i.flag').getAttribute("class"));
    this.userService.updateSetting('currency', [elem.getAttribute("data-c"), elem.getAttribute("data-s")]);
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
