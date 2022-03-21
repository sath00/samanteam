import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, NgForm  } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-invadd',
  templateUrl: './invadd.component.html',
  styleUrls: ['./invadd.component.css']
})
export class InvaddComponent implements OnInit{

  constructor(public productService: ProductService){}
  ngOnInit(): void {}


  onAddItem(form:NgForm){
      if(form.invalid){
          return;
      }
      
      this.productService.addProduct(form.value.ProductName,form.value.ProductDisc,form.value.ProductPrice,form.value.ProductCat,form.value.ProductImg, form.value.ProductQuant);
      form.resetForm();
  }
}
