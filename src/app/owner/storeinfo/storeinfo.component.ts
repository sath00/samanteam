import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { StoreInfo } from '../../models/StoreInfo';
import { storeInfoService } from '../../services/storeinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreinfoeditComponent } from './storeinfoedit/storeinfoedit.component';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.css']
})
export class StoreinfoComponent implements OnInit {
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
  onEdit():void {
    const dialogRef = this.dialog.open(StoreinfoeditComponent, {
      disableClose: true,
      autoFocus: true,
      data: this.storeInfo[0],
      width: "50%"
    })
  }
}
