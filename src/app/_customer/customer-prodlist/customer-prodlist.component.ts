import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-prodlist',
  templateUrl: './customer-prodlist.component.html',
  styleUrls: ['./customer-prodlist.component.css']
})
export class CustomerProdlistComponent implements OnInit {
  
  //instantiated array as Product array
  products: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name','description', 'price', 'category', 'image',  'availability'];
  //created a new subscription to be used when subscribing to observables
  private productSubscription: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort; 

  //instatiated our product service 
  constructor(public productService: ProductService) {
    this.products = new MatTableDataSource();
  }

  //ng on init serves as a constructor when we initialize the InvviewComponent
  ngOnInit():void {
    //we call the funtion getProducts from our product service
    this.productService.getProducts();
    //Product subscription is given a subscription value or an observable where we can subscribe to
    this.productSubscription = this.productService.getProductsUpdatedListener()
    .subscribe((products: Product[]) => {
      this.products = new MatTableDataSource(products);
      this.ngAfterViewInit();
    })
  }

  ngAfterViewInit():void {
    this.products.sort = this.sort;
    this.products.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  //destroys the subscription to avoid memory leaks
  ngOnDestroy():void {
      this.productSubscription.unsubscribe();
  }

}