import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product'
import { Subject } from 'rxjs'

import {environment} from '../../environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  // PRODUCTS

  getProducts() {
    this.http.get<Product[]>(environment.appURL+'/product/list').subscribe((productsData) => {
      this.products = productsData;
      this.productsUpdated.next(this.products);
    })
  }

  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  addProduct(name: string, description: string, price: string, category: string, image: File, availability: string) {

    const prodData = new FormData();
    prodData.append('name', name);
    prodData.append('price', price);
    prodData.append('description', description);
    prodData.append('availability', availability);
    prodData.append('_id', "");
    prodData.append('category', category)
    prodData.append('image', image)

    this.http.post<{ message: string }>(environment.appURL+'/product/add', prodData)
      .subscribe((responseData) => {
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: { message: responseData.message }
        });
        this.getProducts();
      })
  }

  deleteProduct(productID: string) {
    this.http.delete<{ message: string }>(environment.appURL+'/product/remove/' + productID)
      .subscribe((responseData) => {
        this.products = this.products.filter(product => product._id != productID)
        this.productsUpdated.next([...this.products])
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: { message: responseData.message }
        });
      })
  }

  updateAvailability(productID: string, availability: string) {
    const value = {
      _id: productID,
      availability: availability
    }
    this.http.post<{ message: string }>(environment.appURL +'/product/availability', value)
      .subscribe((responseData) => {
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: { message: responseData.message }
        });
      })
  }

  updateProduct(product: Product, newImage: File) {
    const prodData = new FormData();
    prodData.append('name', product.name);
    prodData.append('price', product.price);
    prodData.append('description', product.description);
    prodData.append('availability', product.availability);
    prodData.append('_id', "");
    prodData.append('category', product.category._id);
    prodData.append('imagePath', product.imagePath);
    prodData.append('image', newImage)
    this.http.put<{ message: string }>(environment.appURL +'/product/edit/' + product._id, prodData)
      .subscribe((responseData) => {
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: { message: responseData.message }
        });
        this.getProducts();
      })
  }

  searchProduct(key: string) {
    return this.http.get<Product[]>(environment.appURL +'/product/search/' + key)
  }
}
