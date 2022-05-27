import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from 'src/app/models/CartItem';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  canDelete:boolean = false;

  cartProducts: MatTableDataSource<CartItem>;
  selection = new SelectionModel<CartItem>(true,[]);
  displayedColumns: string[] = ['select','image', 'name', 'quantity', 'price', 'delete'];
  
  //sum of selected prices
  sumOfPrices:number = 0;
  sumOfQuantity:number = 0;
  
  constructor(private cartService: CartService) { 
    this.cartProducts = new MatTableDataSource();
    
  }
  
  ngOnInit(): void {
    this.cartProducts = new MatTableDataSource(this.cartService.display());
    this.selection.changed.subscribe(x=>{
      this.sumOfQuantity=0;
      this.sumOfPrices = 0;
      x.source.selected.forEach(cartItem=>{
        this.sumOfPrices += cartItem.quantity*parseFloat(cartItem.product.price);
        this.sumOfQuantity += cartItem.quantity;
      })
      this.sumOfPrices = Math.round(this.sumOfPrices*100)/100 // fix issues of additional values
    })
  }

  updateOrderSummary(){
    this.sumOfQuantity = 0;
    this.sumOfPrices = 0;
    this.selection.selected.forEach(cartItem => {
      this.sumOfPrices += cartItem.quantity * parseFloat(cartItem.product.price);
      this.sumOfQuantity += cartItem.quantity;
    })
    this.sumOfPrices = Math.round(this.sumOfPrices * 100) / 100 
  }

  // Handling the remove product and Change quantity 
  onRemove(cartProd: CartItem){ //(not yet tested) to be activated when customer wants to remove certain item from cart
    if(this.selection.isSelected(cartProd)){
      this.selection.deselect(cartProd);
    }
    this.cartService.removeProduct(cartProd.product)
    this.cartProducts = new MatTableDataSource(this.cartService.display());
  }

  onChangeQuantity(cartProd: CartItem,quantity: number){
    if(this.selection.isSelected(cartProd)){
      this.sumOfPrices += (quantity-cartProd.quantity)*parseFloat(cartProd.product.price)
      this.sumOfQuantity += quantity-cartProd.quantity;
      this.sumOfPrices = Math.round(this.sumOfPrices*100)/100;
    }
    cartProd.quantity = quantity;
    this.cartService.changeQuantity(cartProd)
  }

  onDeleteSelected(){
    this.selection.selected.forEach(cartItem=>{
      this.onRemove(cartItem);
    })
    this.cartProducts = new MatTableDataSource(this.cartService.display());
  }

  // Handling the select buttons
  isAllSelected(){
    return this.selection.selected.length === this.cartProducts.data.length;
  }

  selectAll(){
    if(this.isAllSelected()){
      this.selection.clear();
      return;
    }
    this.selection.select(...this.cartProducts.data);
  }

  onInputQuantityChange(cartProd:CartItem){
    if(this.selection.isSelected(cartProd)){
      this.updateOrderSummary();
    }
    this.cartService.changeQuantity(cartProd)
  }

}
