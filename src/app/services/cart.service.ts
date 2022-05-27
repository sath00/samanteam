import { Injectable } from "@angular/core";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";



@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: CartItem[] = [];

    addProduct(product: Product, quantity: number) {

        const found = this.cart.some(item => item.product._id === product._id) //checks if product is already in cart, true/false value

        if (!found) { //if product is not in cart yet, add product and quantity to cart
            const temp = {
                product: product,
                quantity: quantity
            }
            this.cart.push(temp);
        } else {      //if product is already in cart, simply update quantity
            const itemIndex = this.cart.findIndex((item => item.product._id === product._id))
            this.cart[itemIndex].quantity += quantity
        }

        this.saveCartData(this.cart);
    }

    removeProduct(product: Product) { //not yet tested hehe
        const itemIndex = this.cart.findIndex(item=> item.product._id === product._id)
        this.cart.splice(itemIndex, 1);
        // this.cart.map((item: any, index: any) => {  //python translation: for item, index in cart
        //     if (product._id === item._id) {       //if id of chosen product to remove matches id of item in cart
        //         this.cart.splice(index, 1);      //then remove 1 item starting at index of matching product, aka remove item from cart
        //     }
        // })
        this.saveCartData(this.cart);
    }

    changeQuantity(cartItem: CartItem){
        const itemIndex = this.cart.findIndex((item => item === cartItem));
        this.cart[itemIndex] = cartItem;
        this.saveCartData(this.cart);
    }

    display() {
        const cart = this.getCartData()
        if(cart){
            this.cart = cart
        }else{
            console.log("Empty Cart");
        }

        return this.cart
        
    }

    private saveCartData(cartItems: CartItem[]){
        localStorage.setItem("cartData",JSON.stringify(cartItems));
    }

    private getCartData(){
        const data = localStorage.getItem("cartData");
        if(data){
            return JSON.parse(data);
        }else{
            console.log("Cart Empty")
        }
    }



}