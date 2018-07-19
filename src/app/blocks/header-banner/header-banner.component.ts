import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../authentication.service'

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.less']
})
export class HeaderBannerComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
