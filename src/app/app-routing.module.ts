import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';
import { StoreinfoComponent } from './storeinfo/storeinfo.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'view-dashboard', component: InvdashComponent },
  { path: 'add-products', component: InvaddComponent },
  { path: 'store-info', component: StoreinfoComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }