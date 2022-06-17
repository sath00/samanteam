import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.css']
})
export class ProdInfoComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ProdInfoComponent>, @Inject(MAT_DIALOG_DATA)public data:Product,
  private cartService:CartService, private _snackBar: MatSnackBar) { }
  quantity = 0;
  durationInSeconds = 2;
  ngOnInit(): void {
    this.quantity = 1;
  }

  onAddToCart(product:Product){
    if(this.quantity==0){
      this._snackBar.open('Cannot add zero quantity!','',{
        duration: this.durationInSeconds*1000
      })
    }else{
      this.cartService.addProduct(product, this.quantity),
        this._snackBar.open('Item successfuly added!', '', {
          duration: this.durationInSeconds * 1000
        })
    }
    
  }

  plus(){
    this.quantity++;
  }
  
  minus(){
    if(this.quantity != 1){
      this.quantity--;
    }
  }

}
