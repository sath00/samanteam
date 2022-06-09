import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ProdeditComponent } from '../../prodedit/prodedit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ProdInfoOwnerComponent } from '../../prodInfoOwner/productInfo.component';
import { InvaddComponent } from '../../invadd/invadd.component';

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

editON = false;


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
    if(this.editON){
      const dialogRef = this.dialog.open(ProdeditComponent, {
        disableClose: true,
        autoFocus: true,
        data: row
      })
    }else{
      const dialogRef = this.dialog.open(ProdInfoOwnerComponent, {
        disableClose: true,
        autoFocus: true,
        data: row
      })
    }
    
  }

  //Deletefunction
  onDeleteProduct(row: Product): void {
    if (confirm("Do you want to remove '" + row.name + "' from the inventory?")) {
      this.productService.deleteProduct(row._id);
    }
  }

  //handles the edit button on the top
  onEditInventory(): void {
    // if (this.displayedColumns.includes('delete')) {
    //   document.getElementById('edit-inventory-btn')?.classList.remove('active');
    //   (document.getElementById('on-create-btn') as HTMLInputElement).disabled = false;
    //   this.displayedColumns.pop();
    //   this.displayedColumns.pop();
    //   this.displayedColumns.pop();
    //   this.displayedColumns.push('availability');
    // } else {
    //   document.getElementById('edit-inventory-btn')?.classList.add('active');
    //   (document.getElementById('on-create-btn') as HTMLInputElement).disabled = true;
    //   this.displayedColumns.pop();
    //   this.displayedColumns.push('availabilityToggle');
    //   this.displayedColumns.push('delete');
    //   this.displayedColumns.push('edit');
      if(this.editON){
        this.editON = false;
        document.getElementById('edit-inventory-btn')?.classList.remove('active');
        (document.getElementById('on-create-btn') as HTMLInputElement).disabled = false;
      }else{
        this.editON = true;
        document.getElementById('edit-inventory-btn')?.classList.add('active');
        (document.getElementById('on-create-btn') as HTMLInputElement).disabled = true;
      }
    }
  
  
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(InvaddComponent, dialogConfig)
  } 


  toggleAvailability(product: Product): void {
    //this.productService.updateAvailability(product._id, product.availability)
    if (product.availability == "Available") {
      product.availability = "Not Available";
    } else {
      product.availability = "Available";
    }
    this.productService.updateAvailability(product._id, product.availability)
  }


}




  // During edit
  // onProdSelect(row: Product) {
  //   const dialogRef = this.dialog.open(ProdeditComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     data: row
  //   })
  // }

