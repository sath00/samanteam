import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvdashComponent } from './owner/invdash/invdash.component';
import { InvaddComponent } from './owner/invadd/invadd.component';
import { StoreinfoComponent } from './owner/storeinfo/storeinfo.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { CustomerProdlistComponent } from './customer/customer-prodlist/customer-prodlist.component';
import { OwnerLayoutComponent } from './layouts/owner-layout/owner-layout.component';
import { AuthGuard } from './services/authentication/authentication.guard';
import { CartComponent } from './customer/cart/cart.component';
import { CusdetailsComponent } from './customer/cusdetails/cusdetails.component';
import { DashboardComponent } from './owner/dashboard/dashboard.component';


const routes: Routes = [

  // customer routes
  {path:'', redirectTo:'/customer/shop',pathMatch:'full'},
  { path:'customer', component: CustomerLayoutComponent,
    children: [
      { path: 'shop', component: CustomerProdlistComponent},
      { path: 'details', component: CusdetailsComponent},
      { path: 'cart', component: CartComponent}
    ]
  },
  // owner route
  {
    path: 'admin', component: OwnerLayoutComponent,
    children: [
      { path: '', redirectTo: 'view-dashboard', pathMatch: 'full'},
      { path: 'view-dashboard', component: DashboardComponent },
      { path: 'inventory', component: InvdashComponent},
      { path: 'add-products', component: InvaddComponent },
      { path: 'store-info', component: StoreinfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [AuthGuard]  //I added authGuard for future use
})
export class AppRoutingModule { }