import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../services/product.service';

import { Product } from '../models/Product'
@Component({
  selector: 'app-invview',
  templateUrl: './invview.component.html',
  styleUrls: ['./invview.component.css']
})

export class InvviewComponent implements OnInit {

  products:Product[] = [];

  private productSubscription: Subscription = new Subscription();

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.productSubscription = this.productService.getProductsUpdatedListener()
    .subscribe((products: Product[]) => {
      this.products = products
    })
    console.log(this.products)
  }
  ngOnDestroy():void {
      this.productSubscription.unsubscribe();
  }

}
