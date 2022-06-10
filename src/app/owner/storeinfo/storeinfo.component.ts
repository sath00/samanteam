import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreInfo } from '../../models/StoreInfo';
import { Feedback } from 'src/app/models/Feedback';
import { storeInfoService } from '../../services/storeinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreinfoeditComponent } from './storeinfoedit/storeinfoedit.component';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.css']
})
export class StoreinfoComponent implements OnInit {
  private storeInfoSub:Subscription = new Subscription();
  private feedbackSub:Subscription = new Subscription();
  storeInfo : StoreInfo[] = [];
  feedback : Feedback[] = [];
  constructor(public storeinfoservice: storeInfoService, public feedbackservice: FeedbackService, private dialog:MatDialog) { }
  
  ngOnInit(): void {
    //get the info from the database
    this.storeinfoservice.getStoreInfo();
    //subscribe
    
    this.storeInfoSub = this.storeinfoservice.getStoreUpdatedListener()
    .subscribe((storeInfo:StoreInfo[]) => {
      this.storeInfo = storeInfo;
    });

    //get the feedback from the database
    this.feedbackservice.getFeedback();
    //subscribe
    
    this.feedbackSub = this.feedbackservice.getFeedbackUpdatedListener()
    .subscribe((feedback:Feedback[]) => {
      this.feedback = feedback;
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
