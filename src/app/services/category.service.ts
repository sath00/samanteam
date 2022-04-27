import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories: Category[] = [];
    private categoriesUpdated = new Subject<Category[]>();

    constructor(private http: HttpClient) { }

    // PRODUCTS

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

        const cat: Category = {
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
        this.http.delete<{ message: string }>('http://localhost:3000/api/category/remove/' + categoryID)
            .subscribe((responseData) => {
                this.categories = this.categories.filter(category => category._id != categoryID)
                // this.products = updatedProds [WARNING IDK IF THIS IS IMPORTANT OR NOT SO BEST NOT TO TOUCH HAHAHAHA BASI MALIMTAN UNYA - Joey]
                this.categoriesUpdated.next([...this.categories])
                console.log(responseData.message)
            })
    }
    getCategoryList(){
        this.getCategory()
        return this.categories
    }

    updateCategory(category:Category) {
        this.http.put<{ message: string }>('http://localhost:3000/api/category/edit/'+category._id, category)//this.categories)
          .subscribe((responseData) => {
            console.log(responseData.message);
            this.getCategory();
          })
      }
}
