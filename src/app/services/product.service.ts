import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http:HttpClient) { }

// PRODUCTS

  getProducts(){
    this.http.get<Product[]>('http://localhost:3000/api/product/list').subscribe((productsData)=>{
      this.products = productsData;
      this.productsUpdated.next(this.products);
    })
  }

  getProductsUpdatedListener() {
        return this.productsUpdated.asObservable();
  }

  addProduct(name: string, description: string, price: string, category: string, image: string, availability: string) {
        const prod: Product = {
            _id:"",
            name: name,
            price: price,
            description: description,
            category: category,
            image: image,
            availability: availability
        }
        this.http.post<{message:string}>('http://localhost:3000/api/product/add',prod)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.getProducts();
        })
    }

  deleteProduct(productID:string){
    this.http.delete<{ message: string }>('http://localhost:3000/api/product/remove/'+productID)
    .subscribe((responseData)=>{
      this.products = this.products.filter(product => product._id != productID)
      this.productsUpdated.next([...this.products])
      console.log(responseData.message)
    })
  }
  
  updateAvailability(productID:string,availability:string){
     const value = {
       _id:productID,
       availability:availability
     }
    this.http.post<{ message: string }>('http://localhost:3000/api/product/availability', value)
      .subscribe((responseData) => {
        console.log(responseData.message)
      })
  }

  updateProduct(product:Product) {
    this.http.put<{ message: string }>('http://localhost:3000/api/product/edit/'+product._id, product)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getProducts();
      })
  }

  searchProduct(key:string){
    return this.http.get<Product[]>('http://localhost:3000/api/product/search/'+key)
  }
}
