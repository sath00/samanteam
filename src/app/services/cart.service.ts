import { Injectable } from "@angular/core";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";



@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart:CartItem[] = [];

    addProduct(product:Product,quantity:number){
        
        const found = this.cart.some(item => item.product === product) //checks if product is already in cart

        if(!found){ //if product is not in cart yet, add product and quantity to cart
            const temp = {
                product: product,
                quantity: quantity
            }
            this.cart.push(temp);
        }else{      //if product is already in cart, simply update quantity
            const itemIndex = this.cart.findIndex((item => item.product === product))
            this.cart[itemIndex].quantity += quantity
        }

        // original joey function:

        // const temp = {
        //     product: product,
        //     quantity: quantity
        // }
        // this.cart.push(temp);
    }


    display(){
        return this.cart
    }

   

}