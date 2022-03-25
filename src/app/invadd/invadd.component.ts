import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, NgForm  } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service'
import {MatSnackBar} from '@angular/material/snack-bar'


@Component({
  selector: 'app-invadd',
  templateUrl: './invadd.component.html',
  styleUrls: ['./invadd.component.css']
})
export class InvaddComponent implements OnInit{
  
  isChecked = true;

  constructor(public productService: ProductService, private _snackBar: MatSnackBar){}
  ngOnInit(): void {}

  onAddItem(form:NgForm){

    var availability:string = "Not Available";

    if (this.isChecked){
        availability = "Available";
        console.log("toggle is activated")
    }

    if(form.invalid){
      return;
    }
    this._snackBar.open("Product added!", "Dismiss");
    this.productService.addProduct(
        form.value.ProductName,
        form.value.ProductDisc,
        form.value.ProductPrice,
        form.value.ProductCat,
        form.value.ProductImg,
        availability);
    form.resetForm();
  }
}
