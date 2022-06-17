import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CataddComponent } from '../catadd/catadd.component';
import { CateditComponent } from '../catedit/catedit.component';

@Component({
  selector: 'app-catdisplay',
  templateUrl: './catdisplay.component.html',
  styleUrls: ['./catdisplay.component.css']
})
export class CatdisplayComponent implements OnInit {

  //instantiated array as category array
  categories: MatTableDataSource<Category>;
  // searchResults:category[] = [];
  displayedColumns: string[] = ['name'];
  //created a new subscription to be used when subscribing to observables
  private categorieSubscription: Subscription = new Subscription();
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  //instatiated our category service 
  constructor(public categoryService: CategoryService, private dialog:MatDialog) {
    this.categories = new MatTableDataSource();
  }

  //ng on init serves as a constructor when we initialize the InvviewComponent
  ngOnInit(): void {
    //we call the funtion getcategories from our category service
    this.categoryService.getCategory();
    //category subscription is given a subscription value or an observable where we can subscribe to
    this.categorieSubscription = this.categoryService.getCategoryUpdatedListener()
    .subscribe((category: Category[]) => {
      // category = category.splice(category.findIndex(cat=>cat.name=="None"),-1);
      category = category.filter((cat)=>{
        return cat.name != "None";
      })
      this.categories = new MatTableDataSource(category);
      this.ngAfterViewInit();
    })
  }
  ngAfterViewInit():void{
    this.categories.sort = this.sort;
    this.categories.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  onCreateCat(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CataddComponent,dialogConfig)
  }

  //Deletefunction
  onDeleteCat(row:Category):void {
    if(confirm("Do you want to remove '"+row.name+"' from the inventory?")){
      this.categoryService.deleteCategory(row._id);
    }
  }

  onEditCat(row:Category):void{
    const dialogRef = this.dialog.open(CateditComponent, {
      disableClose: true,
      autoFocus: true,
      data: row
    })
  }

    //handles the edit button on the top
    onEditInventory():void{
      if(this.displayedColumns.includes('delete')){
        document.getElementById('edit-inventory-btn')?.classList.remove('active');
        (document.getElementById('on-create-btn')as HTMLInputElement ).disabled = false;
        this.displayedColumns.pop();
        this.displayedColumns.pop();
      }else{
        document.getElementById('edit-inventory-btn')?.classList.add('active');
        (document.getElementById('on-create-btn')as HTMLInputElement ).disabled = true;
        this.displayedColumns.push('delete');
        this.displayedColumns.push('edit');
      }
    }
}