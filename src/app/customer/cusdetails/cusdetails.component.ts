import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { StoreInfo } from 'src/app/models/StoreInfo';
import { storeInfoService } from 'src/app/services/storeinfo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CusfeedbackComponent } from '../cusfeedback/cusfeedback.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cusdetails',
  templateUrl: './cusdetails.component.html',
  styleUrls: ['./cusdetails.component.css']
})
export class CusdetailsComponent implements OnInit {
  private storeInfoSub:Subscription = new Subscription();
  storeInfo : StoreInfo[] = [];
  constructor(public storeinfoservice: storeInfoService,private dialog:MatDialog) { }
  
  ngOnInit(): void {
    //get the info from the database
    this.storeinfoservice.getStoreInfo();
    //subscribe
    
    this.storeInfoSub = this.storeinfoservice.getStoreUpdatedListener()
    .subscribe((storeInfo:StoreInfo[]) => {
      this.storeInfo = storeInfo;
    });
  }
  ngOnDestroy():void {
    this.storeInfoSub.unsubscribe();
  }

  onFeedback(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CusfeedbackComponent,dialogConfig)
  }

  onSubmitFB(form: NgForm) {

    if (form.invalid) {
      return;
    }
    form.resetForm();
  }
}
