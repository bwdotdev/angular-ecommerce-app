import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less']
})
export class PriceComponent implements OnInit {

  price: number = 0.00;
  @Input() default: number = 0.00;
  @Input() currency: string = 'GBP';
  @Input() symbol: string = '£';

  constructor(private userService: UserService, private http: HttpClient) { }

  async ngOnInit() {
    this.updatePrice();
    const that = this;
    window.addEventListener( "storage", this.handleStorageEvent );
  }

  async updatePrice() {
    console.log('update price');
    const userCurrency = this.userService.getSetting('currency');
    if(this.currency !== userCurrency[0]) {
      this.price = await this.convert(this.default, userCurrency[0], this.currency);
      this.symbol = userCurrency[1];
    } else {
      this.price = this.default;
    }
  }

  convert(price: number, to: string, from: string = this.currency): Promise<number> {
    return new Promise((resolve, reject) => {
      const query: string = from + '_' + to;

      this.http.get('https://free.currencyconverterapi.com/api/v5/convert', {
        params: {
          compact: 'y',
          q: query
        }
      }).subscribe(data => {
        if(data[query] && data[query].val) {
          resolve(price * data[query].val);
        }
      });
    });
  }

  handleStorageEvent(event: StorageEvent) {
    console.log(event);
    this.updatePrice();
  }

}
