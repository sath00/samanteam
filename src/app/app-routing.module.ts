import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';
import { StoreinfoComponent } from './storeinfo/storeinfo.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { CustomerProdlistComponent } from './_customer/customer-prodlist/customer-prodlist.component';


const routes: Routes = [

  //multi-layout scheme

  // default routes (owner)
  { path: '', component: DefaultLayoutComponent,
    children: [
      { path: 'view-dashboard', component: InvdashComponent },
      { path: 'add-products', component: InvaddComponent },
      { path: 'store-info', component: StoreinfoComponent}
    ]
  },
  
  // customer routes
  { path:'customer', component: CustomerLayoutComponent,
    children: [
      { path: 'shop', component: CustomerProdlistComponent},
    ]
  },

  // login route
  { path: 'login', component: LoginLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }