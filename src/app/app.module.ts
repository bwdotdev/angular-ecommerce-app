import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { HeaderComponent } from './blocks/header/header.component';
import { HeaderBannerComponent } from './blocks/header-banner/header-banner.component';
import { BannerComponent } from './blocks/banner/banner.component';
import { SaleComponent } from './pages/sale/sale.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { KidsComponent } from './pages/kids/kids.component';
import { LoginComponent } from './pages/login/login.component';
import { CurrencyDropdownComponent } from './blocks/currency-dropdown/currency-dropdown.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    HeaderBannerComponent,
    BannerComponent,
    SaleComponent,
    MenComponent,
    WomenComponent,
    KidsComponent,
    LoginComponent,
    CurrencyDropdownComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
