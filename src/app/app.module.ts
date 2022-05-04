import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule  } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MiddlesectionComponent } from './middlesection/middlesection.component';
import { SidesectionComponent } from './sidesection/sidesection.component';
import { InvdashComponent } from './invdash/invdash.component';
import { InvaddComponent } from './invadd/invadd.component';
import { ProdeditComponent } from './prodedit/prodedit.component';
import { GriddisplayComponent } from './displayInvCom/griddisplay/griddisplay.component';
import { TabledisplayComponent } from './displayInvCom/tabledisplay/tabledisplay.component';
import { CataddComponent } from './catadd/catadd.component';
import { CatdisplayComponent } from './catdisplay/catdisplay.component';
import { CateditComponent } from './catedit/catedit.component';
import { StoreinfoComponent } from './storeinfo/storeinfo.component';
import { StoreinfoeditComponent } from './storeinfo/storeinfoedit/storeinfoedit.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MiddlesectionComponent,
    SidesectionComponent,
    InvdashComponent,
    InvaddComponent,
    ProdeditComponent,
    GriddisplayComponent,
    TabledisplayComponent,
    CataddComponent,
    CatdisplayComponent,
    CateditComponent,
    StoreinfoComponent,
    StoreinfoeditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[InvaddComponent]
})
export class AppModule { }
