import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  defaultSettings: object = {
    currency: ['USD', '$']
  };

  constructor(private http: HttpClient) {
    this.getSettings();
  }

  getSettings(): object {
    const settings = JSON.parse(localStorage.getItem('UserSettings')) || this.defaultSettings;
    return settings;
  }

  getSetting(setting: string): any {
    const values = setting.split('.');

    let current = this.getSettings();
    values.forEach((val, key) => {
      current = current[val];
    });
    return current || null;
  }

  updateSetting(setting: string, value: any) {
    const old = this.getSettings();
    
    const values = setting.split('.');

    let update = {};
    let last;
    values.forEach((val, key) => {
      if(key === values.length - 1 && !last) {
        update[val] = value;
      } else if(key === values.length - 1) {
        last[val] = value;
      } else if(last) {
        last[val] = {};
        last = last[val];
      } else {
        update[val] = {};
        last = update[val];
      }
    });

    const updated = Object.assign(old, update);
    localStorage.setItem('UserSettings', JSON.stringify(updated));
  }
}
