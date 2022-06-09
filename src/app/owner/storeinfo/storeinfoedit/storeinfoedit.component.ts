import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreInfo } from 'src/app/models/StoreInfo';
import { storeInfoService } from 'src/app/services/storeinfo.service';

@Component({
  selector: 'app-storeinfoedit',
  templateUrl: './storeinfoedit.component.html',
  styleUrls: ['./storeinfoedit.component.css']
})
export class StoreinfoeditComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<StoreinfoeditComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:StoreInfo,
    public storeInfoServcie: storeInfoService) {}
  ngOnInit(): void {
  }
  tempStoreInfo:StoreInfo = {
    _id:this.data._id,
    telephone: this.data.telephone,
    cellphone: this.data.cellphone,
    streetAdd: this.data.streetAdd,
    city: this.data.city,
    state: this.data.state,
    zip: this.data.zip,
    details: this.data.details
  }
  onSaveDetails() {
    this.data.city = this.tempStoreInfo.city;
    this.data.telephone = this.tempStoreInfo.telephone;
    this.data.cellphone = this.tempStoreInfo.cellphone;
    this.data.streetAdd = this.tempStoreInfo.streetAdd;
    this.data.state = this.tempStoreInfo.state;
    this.data.zip = this.tempStoreInfo.zip;
    this.data.details = this.tempStoreInfo.details;
    
    this.storeInfoServcie.updateStoreInfo(this.tempStoreInfo);
    this.dialogRef.close();
    // if (form.invalid) {
    //   return;
    // }
    // form.resetForm();
  }

}
