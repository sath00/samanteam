import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvviewComponent } from './invview/invview.component';
import { AppComponent } from './app.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';

const routes: Routes = [
  { path: 'view-dashboard', component: InvdashComponent },
  { path: 'view-products', component: InvviewComponent },
  { path: 'add-products', component: InvaddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
