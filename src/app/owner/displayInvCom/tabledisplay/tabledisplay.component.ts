import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvaddComponent } from 'src/app/owner/invadd/invadd.component';
import { ProdeditComponent } from 'src/app/owner/prodedit/prodedit.component';


@Component({
  selector: 'app-tabledisplay',
  templateUrl: './tabledisplay.component.html',
  styleUrls: ['./tabledisplay.component.css']
})
export class TabledisplayComponent implements OnInit, AfterViewInit{
  //instantiated array as Product array
  products: MatTableDataSource<Product>;
  // searchResults:Product[] = [];
  displayedColumns: string[] = ['name','description', 'price', 'category', 'image',  'availability'];
  //created a new subscription to be used when subscribing to observables
  private productSubscription: Subscription = new Subscription();
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort; 
  //instatiated our product service 
  constructor(public productService: ProductService, private dialog:MatDialog) {
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
      this.ngAfterViewInit();
    })

  }
  ngAfterViewInit():void{
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
  //Deletefunction
  onDeleteProduct(row:Product):void {
    if(confirm("Do you want to remove '"+row.name+"' from the inventory?")){
      this.productService.deleteProduct(row._id);
    }
  }

  //handles the edit button on the top
  onEditInventory():void{
    if(this.displayedColumns.includes('delete')){
      document.getElementById('edit-inventory-btn')?.classList.remove('active');
      (document.getElementById('on-create-btn')as HTMLInputElement ).disabled = false;
      this.displayedColumns.pop();
      this.displayedColumns.pop();
      this.displayedColumns.pop();
      this.displayedColumns.push('availability');
    }else{
      document.getElementById('edit-inventory-btn')?.classList.add('active');
      (document.getElementById('on-create-btn')as HTMLInputElement ).disabled = true;
      this.displayedColumns.pop();
      this.displayedColumns.push('availabilityToggle');
      this.displayedColumns.push('delete');
      this.displayedColumns.push('edit');
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(InvaddComponent,dialogConfig)
  } 
  onProdEdit(row:Product):void{
    const dialogRef = this.dialog.open(ProdeditComponent, {
      disableClose: true,
      autoFocus: true,
      data: row
    })
  }

  onConfirmDelete(name:string, productID:string):void{

  }

  toggleAvailability(product:Product):void{
    //this.productService.updateAvailability(product._id, product.availability)
    if(product.availability == "Available"){
      product.availability = "Not Available";
    }else{
      product.availability = "Available";
    }
    this.productService.updateAvailability(product._id, product.availability)
  }
  //Search product function
  // onSearch(form:NgForm){
  //   if(form.invalid){
  //     return;
  //   }
  //   var invtable = document.getElementById("invTable")!; 
  //   var noresults = document.getElementById("cannotFind")!;
  //   noresults.style.display = "none";

  //   //Search string is stored in variable "searchString"
  //   var searchString = form.value.SearchText;
  //   console.log("Search string is '" + searchString + "'")

  //   //INSERT SEARCH API HERE
  //   this.productService.searchProduct(searchString)
  //   .subscribe((res:Product[])=>{
  //     //stored the results of the API call in the searchResults variable
  //     this.searchResults = res;
  //     console.log(this.searchResults)

  //     if(this.searchResults.length == 0){       //if results return nothing
  //       console.log("Result cannot be found.")
  //       invtable.style.display = "none";        //hide table
  //       noresults.style.display = "block";      //show "Product cannot be found." message
  //     }else{
  //       this.products = this.searchResults;     //table will be built based on search results
  //       invtable.style.display = "block";       //show table
  //     }

  //   })

  //   form.resetForm();
  // }
}
