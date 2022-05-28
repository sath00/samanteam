import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ProdeditComponent } from '../../prodedit/prodedit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-griddisplay',
  templateUrl: './griddisplay.component.html',
  styleUrls: ['./griddisplay.component.css']
})
export class GriddisplayComponent implements OnInit {
//instantiated array as Product array
  //instantiated array as Product array
products: MatTableDataSource<Product>;
//created a new subscription to be used when subscribing to observables
private productSubscription: Subscription = new Subscription();
//instantaite isModified that tracks changes on the inventory
isModified = false;
//instatiated our product service
  constructor(public productService: ProductService, private dialog: MatDialog) { 
    this.products = new MatTableDataSource();
  }


//ng on init serves as a constructor when we initialize the InvviewComponent
ngOnInit(): void {
  //we call the funtion getProducts from our product service
  this.productService.getProducts();
  //Product subscription is given a subscription value or an observable where we can subscribe to
  this.productSubscription = this.productService.getProductsUpdatedListener()
  .subscribe((products: Product[]) => {
    this.products = new MatTableDataSource(products);
  })
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  onProdSelect(row: Product) {
    const dialogRef = this.dialog.open(ProdeditComponent, {
      disableClose: true,
      autoFocus: true,
      data: row
    })
  }

}
