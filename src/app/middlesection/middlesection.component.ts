import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//imported the product service 
import { ProductService } from '../services/product.service';
//imported the product model so we can use it as a sort of template for variables
import { Product } from '../models/Product'

@Component({
  selector: 'app-middlesection',
  templateUrl: './middlesection.component.html',
  styleUrls: ['./middlesection.component.css']
})
export class MiddlesectionComponent implements OnInit {
  //instantiated array as Product array
  products:Product[] = [];
  //created a new subscription to be used when subscribing to observables
  private productSubscription: Subscription = new Subscription();
  //instantaite isModified that tracks changes on the inventory
  isModified = false;
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
  //Deletefunction
  onDeleteProduct(productID:string, productName:string):void {
    if(confirm("Do you want to remove '"+productName+"' from the inventory?")){
      this.productService.deleteProduct(productID);
    }
  }
  
  //handles the edit button on the top
  onEditInventory():void{
    var editInventory = document.getElementById('edit-inv');
    var element = document.querySelectorAll('td');
    editInventory?.classList.toggle('active');
    if(!editInventory?.classList.contains('active') && this.isModified ==true){
      //call the update availability function here
      this.isModified=false;
    }
    element.forEach((data)=>{
      if(data.id == 'delete' || data.id == 'edit' ||data.id=='availability-toggle' ||data.id=='availability-content'){
        data.classList.toggle('active');
      }
    })
    
  }
  //just call this function to update availability
  onUpdateAvailability(productID:string,availability:string):void{
    if(availability=='Not available'){
      availability = 'Available';
    }else{
      availability = 'Not available';
    }
    
    this.productService.updateAvailability(productID,availability)
  }

  onConfirmDelete(name:string, productID:string):void{

  }

  toggleAvailability(product:Product):void{
    if(product.availability == "Available"){
      product.availability = "Not Available";
    }else{
      product.availability = "Available";
    }
    this.isModified = true;
  }
}
