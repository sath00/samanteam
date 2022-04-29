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

  addProduct(name: string, description: string, price: string, category: string, image: File, availability: string) {
        
        const prodData = new FormData();
        const userID = "1";
        prodData.append('userID', userID);
        prodData.append('name',name);
        prodData.append('price',price);
        prodData.append('description',description);
        prodData.append('availability',availability);
        prodData.append('_id',"");
        prodData.append('category',category)
        prodData.append('image',image)

        this.http.post<{message:string}>('http://localhost:3000/api/product/add',prodData)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.getProducts();
        })
    }

  deleteProduct(productID:string){
    this.http.delete<{ message: string }>('http://localhost:3000/api/product/remove/'+productID,{body:{userID:"1"}})
    .subscribe((responseData)=>{
      this.products = this.products.filter(product => product._id != productID)
      this.productsUpdated.next([...this.products])
      console.log(responseData.message)
    })
  }
  
  updateAvailability(productID:string,availability:string){
     const value = {
       userID: "1",
       _id:productID,
       availability:availability
     }
    this.http.post<{ message: string }>('http://localhost:3000/api/product/availability', value)
      .subscribe((responseData) => {
        console.log(responseData.message)
      })
  }

  updateProduct(product:Product,newImage:File) {
    const prodData = new FormData();
    const userID = "1";
    prodData.append('userID', userID);

    prodData.append('name', product.name);
    prodData.append('price', product.price);
    prodData.append('description', product.description);
    prodData.append('availability', product.availability);
    prodData.append('_id', "");
    prodData.append('category', product.category._id);
    
    prodData.append('imagePath', product.imagePath);
    prodData.append('image',newImage)
    this.http.put<{ message: string }>('http://localhost:3000/api/product/edit/'+product._id, prodData)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getProducts();
      })
  }

  searchProduct(key:string){
    return this.http.get<Product[]>('http://localhost:3000/api/product/search/'+key)
  }
}
