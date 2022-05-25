import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.css']
})
export class ProdInfoComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ProdInfoComponent>, @Inject(MAT_DIALOG_DATA)public data:Product) { }

  ngOnInit(): void {
  }

  quantity : number = 1;
  plus(){
    this.quantity++;
  }
  minus(){
    if(this.quantity != 1){
      this.quantity--;
    }
  }

}
