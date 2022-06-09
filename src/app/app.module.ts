import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './owner/sidebar/sidebar.component';
import { MiddlesectionComponent } from './owner/middlesection/middlesection.component';
import { SidesectionComponent } from './owner/sidesection/sidesection.component';
import { InvdashComponent } from './owner/invdash/invdash.component';
import { InvaddComponent } from './owner/invadd/invadd.component';
import { ProdeditComponent } from './owner/prodedit/prodedit.component';
import { GriddisplayComponent } from './owner/displayInvCom/griddisplay/griddisplay.component';
import { TabledisplayComponent } from './owner/displayInvCom/tabledisplay/tabledisplay.component';
import { CataddComponent } from './owner/catadd/catadd.component';
import { CatdisplayComponent } from './owner/catdisplay/catdisplay.component';
import { CateditComponent } from './owner/catedit/catedit.component';
import { StoreinfoComponent } from './owner/storeinfo/storeinfo.component';
import { StoreinfoeditComponent } from './owner/storeinfo/storeinfoedit/storeinfoedit.component';
import { LoginComponent } from './owner/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { CusnavComponent } from './customer/cusnav/cusnav.component';
import { CustomerProdlistComponent } from './customer/customer-prodlist/customer-prodlist.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { AuthInterceptor } from './services/authentication/authentication.interceptor'
import { OwnerLayoutComponent } from './layouts/owner-layout/owner-layout.component';
import { ProdInfoComponent } from './customer/prodInfo/prod-info/prod-info.component'
import { EditcredComponent } from './owner/editcred/editcred.component';
import { CartComponent } from './customer/cart/cart.component';
import { CusdetailsComponent } from './customer/cusdetails/cusdetails.component';
import { DashboardComponent } from './owner/dashboard/dashboard.component';
import { ProdInfoOwnerComponent } from './owner/prodInfoOwner/productInfo.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorDisplayComponent } from './error/error-display.component';
import { SuccessDialogComponent } from './success/success-dialog.component';

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
    LoginComponent,
    LoginLayoutComponent,
    CusnavComponent,
    CustomerProdlistComponent,
    CustomerLayoutComponent,
    OwnerLayoutComponent,
    ProdInfoComponent,
    EditcredComponent,
    CartComponent,
    CusdetailsComponent,
    DashboardComponent,
    ProdInfoOwnerComponent,
    ErrorDisplayComponent,
    SuccessDialogComponent
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
    MatStepperModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [InvaddComponent]
})
export class AppModule { }
