import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MiddlesectionComponent } from './middlesection/middlesection.component';
import { SidesectionComponent } from './sidesection/sidesection.component';
import { InvviewComponent } from './invview/invview.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MiddlesectionComponent,
    SidesectionComponent,
    InvviewComponent,
    InvdashComponent,
    InvaddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
