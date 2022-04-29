import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category'
import { Subject } from 'rxjs'
import { ProductService } from './product.service'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories: Category[] = [];
    private categoriesUpdated = new Subject<Category[]>();

    constructor(private http: HttpClient,public productService: ProductService) { }

    // CATEGORY

    getCategory() {
        this.http.get<Category[]>('http://localhost:3000/api/category/list').subscribe((categoriesData) => {
            this.categories = categoriesData;
            this.categoriesUpdated.next(this.categories);
        })
    }

    getCategoryUpdatedListener() {
        return this.categoriesUpdated.asObservable();
    }

    addCategory(name: string) {

        const cat = {
            userID:"1",
            _id: "",
            name: name,
        }
        this.http.post<{ message: string }>('http://localhost:3000/api/category/add', cat)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.getCategory();
            })
    }

    deleteCategory(categoryID: string) {
        this.http.delete<{ message: string }>('http://localhost:3000/api/category/remove/' + categoryID,{body: {userID:"1"}})
            .subscribe((responseData) => {
                this.categories = this.categories.filter(category => category._id != categoryID)
                this.categoriesUpdated.next([...this.categories])
                this.productService.getProducts();
                console.log(responseData.message)
            })
    }

    getCategoryList(){
        this.getCategory()
        return this.categories
    }

    updateCategory(category:Category) {
        const cat = {
            userID:"1",
            _id:category._id,
            name:category.name
        }
        this.http.put<{ message: string }>('http://localhost:3000/api/category/edit/'+category._id, cat)
          .subscribe(() => {
            this.getCategory();
            this.productService.getProducts();
          })
      }
}
