import { Injectable } from "@angular/core";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";



@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart:CartItem[] = [];



    addProduct(product:Product,quantity:number){
        const temp = {
            product: product,
            quantity: quantity
        }
        this.cart.push(temp);
    }


    display(){
        return this.cart
    }

   

}