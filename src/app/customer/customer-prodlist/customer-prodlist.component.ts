import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProdInfoComponent } from '../prodInfo/prod-info/prod-info.component';


@Component({
  selector: 'app-customer-prodlist',
  templateUrl: './customer-prodlist.component.html',
  styleUrls: ['./customer-prodlist.component.css']
})
export class CustomerProdlistComponent implements OnInit {
  isTableView:boolean = false;
  //instantiated array as Product array
  products: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name','description', 'price', 'category', 'image',  'availability'];
  //created a new subscription to be used when subscribing to observables
  private productSubscription: Subscription = new Subscription();
  gridCol:number = 5;
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.gridCol = Math.floor(event.target.innerWidth/200);
    console.log((event.target.innerWidth/200));
  }
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort; 

  //instatiated our product service 
  constructor(public productService: ProductService, private dialog:MatDialog) {
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
  onProdSelect(row:Product){
    const dialogRef = this.dialog.open(ProdInfoComponent, {
      disableClose: true,
      autoFocus: true,
      data: row
    })
  }

  //destroys the subscription to avoid memory leaks
  ngOnDestroy():void {
      this.productSubscription.unsubscribe();
  }

}