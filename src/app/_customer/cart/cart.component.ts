import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cartService.display())
  }

  onRemove(product: Product){ //(not yet tested) to be activated when customer wants to remove certain item from cart
    this.cartService.removeProduct(product)
    console.log("Updated cart: " + this.cartService.display())
  }

}
