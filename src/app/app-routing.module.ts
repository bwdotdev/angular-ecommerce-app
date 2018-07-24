import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./pages/index/index.component";
import { MenComponent } from "./pages/men/men.component";
import { WomenComponent } from "./pages/women/women.component";
import { KidsComponent } from "./pages/kids/kids.component";
import { LoginComponent } from "./pages/login/login.component";
import { AccountComponent } from "./pages/account/account.component";
import { SaleComponent } from "./pages/sale/sale.component";
import { CategoryComponent } from "./pages/category/category.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'sale/:slug', component: SaleComponent },
  { path: 'category/:slug', component: CategoryComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
