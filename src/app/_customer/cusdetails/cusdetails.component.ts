import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { StoreInfo } from 'src/app/models/StoreInfo';
import { storeInfoService } from 'src/app/services/storeinfo.service';
import { MatDialog } from '@angular/material/dialog';

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
}
