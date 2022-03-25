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
    this.http.get<{_id:string,name:string, description:string,price:string,category:string,image:string,availability:string}[]>('http://localhost:3000/api/items').subscribe((productsData)=>{
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
        this.http.post<{message:string}>('http://localhost:3000/api/add-items',prod)
        .subscribe((responseData)=>{
            console.log(responseData.message)
        })
    }

  deleteProduct(productID:string){
    this.http.delete<{ message: string }>('http://localhost:3000/api/remove-item/'+productID)
    .subscribe((responseData)=>{
      
      this.products = this.products.filter(product => product._id != productID)
      // this.products = updatedProds [WARNING IDK IF THIS IS IMPORTANT OR NOT SO BEST NOT TO TOUCH HAHAHAHA BASI MALIMTAN UNYA - Joey]
      this.productsUpdated.next([...this.products])
      console.log(responseData.message)
    })
  }
  
  updateAvailability(productID:string,availability:string){
     const value = {
       _id:productID,
       availability:availability
     }
    this.http.post<{ message: string }>('http://localhost:3000/api/item/availability', value)
      .subscribe((responseData) => {
        console.log(responseData.message)
      })
  }
}
