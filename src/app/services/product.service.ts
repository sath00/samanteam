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

  getProducts(){
    this.http.get<{name:string, description:string,price:string,category:string,image:string,quantity:string}[]>('http://localhost:3000/api/items').subscribe((productsData)=>{
      this.products = productsData;
      this.productsUpdated.next(this.products);
    })
  }

  getProductsUpdatedListener() {
        return this.productsUpdated.asObservable();
  }

  addProduct(name: string, description: string, price: string, category: string, image: string, quantity: string) {
        
        const prod: Product = {
            name:name,
            price: price,
            description: description,
            category: category,
            image: image,
            quantity: quantity
        }
        this.http.post<{message:string}>('http://localhost:3000/api/add-items',prod)
        .subscribe((responseData)=>{
            console.log(responseData.message)
        })
        
        
    }
}
