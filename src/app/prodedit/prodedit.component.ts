import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/Product';

@Component({
  selector: 'app-prodedit',
  templateUrl: './prodedit.component.html',
  styleUrls: ['./prodedit.component.css']
})
export class ProdeditComponent implements OnInit {
  isChecked = false;
  constructor(public dialogRef:MatDialogRef<ProdeditComponent>, @Inject(MAT_DIALOG_DATA)public data:Product) { }

  tempProduct:Product = {
    _id:this.data._id, 
    name:this.data.name, 
    description:this.data.description, 
    availability:this.data.availability, 
    category:this.data.category,
    price:this.data.price,
    image:this.data.image
  }
  ngOnInit(): void {
    if(this.data.availability=='Available'){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }

  onSaveChanges(): void {
    this.data.name = this.tempProduct.name;
    if(this.isChecked){
      this.data.availability = 'Available';
    }else{
      this.data.availability = 'Not Available';
    }
    this.data.category = this.tempProduct.category;
    this.data.description = this.tempProduct.description;
    this.data.price = this.tempProduct.price;
    this.data.image = this.tempProduct.image;
    this.dialogRef.close();
  }

}
