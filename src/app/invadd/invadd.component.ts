import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, NgForm  } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-invadd',
  templateUrl: './invadd.component.html',
  styleUrls: ['./invadd.component.css']
})
export class InvaddComponent implements OnInit{
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  constructor(public productService: ProductService){}
  ngOnInit(): void {}


  onAddItem(form:NgForm){
    console.log("hello");
    if(form.invalid){
        return;
      }
      this.productService.addProduct(form.value.name, form.value.description, form.value.price, form.value.category, form.value.image, form.value.quantity);
      form.resetForm();
  }

  /*THIS DOESNT WORK IGNORE IGNORE IGNORE IGNORE IGNORE
  form: FormGroup; //form of type FormGroup
  product: Product; //product of type Product defined in models/Product.ts
  imageData: string; //path of image data will be referenced as a string

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup ({
      name: new FormControl(null),
      description: new FormControl(null),
      price: new FormControl(null),
      category: new FormControl(null),
      image: new FormControl(null),
      quantity: new FormControl(null)
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) { //if choesn file is of the correct type
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string; //data turns into string represting image
      }
      reader.readAsDataURL(file); //reads file and converts it to image
    }
  }

  onSubmit() {
    console.log('submitted product');
    this.form.reset();      //resets form
    this.imageData = '';  //clears image data
  }
  */
}
