import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category'
import { Subject } from 'rxjs'
import { ProductService } from './product.service'
import { environment } from '../../environments/environment'
import { SuccessDialogComponent } from '../success/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories: Category[] = [];
    private categoriesUpdated = new Subject<Category[]>();

    constructor(private http: HttpClient, public productService: ProductService, private dialog: MatDialog) { }
    // CATEGORY

    getCategory() {
        this.http.get<Category[]>(environment.appURL +'/category/list').subscribe((categoriesData) => {
            const nullCat: Category = { //added a null category
                name:"None",
                _id:""
            }
            this.categories = categoriesData;
            this.categories.push(nullCat);
            this.categoriesUpdated.next(this.categories);
        })
    }

    getCategoryUpdatedListener() {
        return this.categoriesUpdated.asObservable();
    }

    addCategory(name: string) {

        const cat = {
            _id: "",
            name: name,
        }
        this.http.post<{ message: string }>(environment.appURL +'/category/add', cat)
            .subscribe((responseData) => {
                this.dialog.open(SuccessDialogComponent, {
                    width: '300px',
                    data: { message: responseData.message }
                });
                this.getCategory();
            })
    }

    deleteCategory(categoryID: string) {
        this.http.delete<{ message: string }>(environment.appURL +'/category/remove/' + categoryID)
            .subscribe((responseData) => {
                this.categories = this.categories.filter(category => category._id != categoryID)
                this.categoriesUpdated.next([...this.categories])
                this.productService.getProducts();
                this.dialog.open(SuccessDialogComponent, {
                    width: '300px',
                    data: { message: responseData.message }
                });
            })
    }

    getCategoryList(){
        this.getCategory()
        return this.categories
    }

    updateCategory(category:Category) {
        const cat = {
            _id:category._id,
            name:category.name
        }
        this.http.put<{ message: string }>(environment.appURL +'/category/edit/'+category._id, cat)
          .subscribe((responseData) => {
            this.getCategory();
            this.productService.getProducts();
            this.dialog.open(SuccessDialogComponent, {
                width: '300px',
                data: { message: responseData.message }
            });
          })
      }
}
