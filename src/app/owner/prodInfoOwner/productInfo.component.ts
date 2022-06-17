import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-prod-info-owner',
    templateUrl: './productInfo.component.html',
    styleUrls: ['./productInfo.component.css']
})
export class ProdInfoOwnerComponent{

    constructor(public dialogRef: MatDialogRef<ProdInfoOwnerComponent>, @Inject(MAT_DIALOG_DATA) public data: Product,
        private cartService: CartService) { }

}
