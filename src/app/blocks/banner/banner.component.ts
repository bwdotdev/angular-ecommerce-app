import {Component, Input, OnInit, ElementRef, AfterViewInit} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit, AfterViewInit {
  @Input() autoPlay: boolean = true;

  constructor(private elem: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit() {
    $(this.elem.nativeElement.children[0]).bannerCarousel({
      autoPlay: this.autoPlay
    });
  }

}
