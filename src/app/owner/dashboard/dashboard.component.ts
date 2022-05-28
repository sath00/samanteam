import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/Product";
import { ProductService } from "src/app/services/product.service";



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
}) export class DashboardComponent implements OnInit, OnDestroy{

    constructor(public productService: ProductService){}
    


    private productSubscription: Subscription = new Subscription();
    
    isLoading = false;

    totalProducts = 0;
    availableProducts = 0;
    unavailableProducts = 0;

    ngOnInit(): void {
        this.isLoading = true;
        this.productService.getProducts();
        this.totalProducts = 0;
        this.availableProducts = 0;
        this.unavailableProducts = 0;
        this.productSubscription = this.productService.getProductsUpdatedListener()
            .subscribe((products: Product[]) => {
                this.totalProducts = products.length
                products.forEach((product: Product) =>{
                    if(product.availability=="Available"){
                        this.availableProducts+=1;
                    }else if(product.availability=="Not Available"){
                        this.unavailableProducts+=1;
                    }
                })
            })
    }
    ngOnDestroy(){
        this.productSubscription.unsubscribe();
    }
}
