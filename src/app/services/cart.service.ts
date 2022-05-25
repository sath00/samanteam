import { Injectable } from "@angular/core";
import { Product } from "../models/Product";



@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart:Product[] = [];



    addProduct(product:Product){
        this.cart.push(product);
    }


    display(){
        return this.cart
    }

   

}