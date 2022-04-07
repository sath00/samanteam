import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';

const routes: Routes = [
  { path: 'view-dashboard', component: InvdashComponent },
  { path: 'add-products', component: InvaddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
