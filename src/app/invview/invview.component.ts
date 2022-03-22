
//imports
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//imported the product service 
import { ProductService } from '../services/product.service';
//imported the product model so we can use it as a sort of template for variables


import { Product } from '../models/Product'
@Component({
  selector: 'app-invview',
  templateUrl: './invview.component.html',
  styleUrls: ['./invview.component.css']
})


export class InvviewComponent implements OnInit {

  //instantiated array as Product array
  products:Product[] = [];

  //created a new subscription to be used when subscribing to observables
  private productSubscription: Subscription = new Subscription();

  //instatiated our product service
  constructor(public productService: ProductService) { }


  //ng on init serves as a constructor when we initialize the InvviewComponent
  ngOnInit(): void {
    //we call the funtion getProducts from our product service
    this.productService.getProducts();
    //Product subscription is given a subscription value or an observable where we can subscribe to
    this.productSubscription = this.productService.getProductsUpdatedListener()
    .subscribe((products: Product[]) => {
      this.products = products
    })
  }
  //destroys the subscription to avoid memory leaks
  ngOnDestroy():void {
      this.productSubscription.unsubscribe();
  }

}
