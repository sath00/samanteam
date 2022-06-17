import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/Category";
import { Product } from "src/app/models/Product";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
}) export class DashboardComponent implements OnInit, OnDestroy{

    constructor(public productService: ProductService,public categoryService: CategoryService){}
    


    private productSubscription: Subscription = new Subscription();
    private categorySubscription: Subscription = new Subscription();
    
    isLoading = false;

    totalProducts = 0;
    availableProducts = 0;
    unavailableProducts = 0;
    totalCategories = 0;


    ngOnInit(): void {
        this.isLoading = true;
        this.productService.getProducts();
        this.totalProducts = 0;
        this.availableProducts = 0;
        this.unavailableProducts = 0;
        this.productSubscription = this.productService.getProductsUpdatedListener()
            .subscribe((products: Product[]) => {
                this.totalProducts = products.length;
                products.forEach((product: Product) =>{
                    if(product.availability=="Available"){
                        this.availableProducts+=1;
                    }else if(product.availability=="Not Available"){
                        this.unavailableProducts+=1;
                    }
                })
            })
        this.categoryService.getCategory();
        this.categorySubscription = this.categoryService.getCategoryUpdatedListener()
        .subscribe((categories: Category[]) =>{
            categories = categories.filter((cat) => {
                return cat.name != "None";
            })
            this.totalCategories = categories.length;
        })
    }
    ngOnDestroy(){
        this.productSubscription.unsubscribe();
    }
}
