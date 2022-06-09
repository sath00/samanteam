import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { ProductService } from '../../services/product.service'
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-invadd',
  templateUrl: './invadd.component.html',
  styleUrls: ['./invadd.component.css']
})
export class InvaddComponent implements OnInit{
  isChecked = true;
  categoryList: Category[] = this.categoryService.getCategoryList()
  constructor(public productService: ProductService, public categoryService: CategoryService){};
  selectedFile: any ="";
  imagePrev:string="";

  ngOnInit(): void {
  }

  ngOnDestroy():void{
  }


  onAddItem(form:NgForm){
    var availability:string = "Not Available";
    if (this.isChecked){
        availability = "Available";
    }
    if(form.invalid){
      return;
    }
    if(form.value.ProductCat==="None"){
      form.value.ProductCat = ""
    }
    this.productService.addProduct(
        form.value.ProductName,
        form.value.ProductDisc,
        form.value.ProductPrice,
        form.value.ProductCat,
        this.selectedFile[0],
        availability,);
    form.resetForm();
    this.imagePrev=''
  }
  onImagePicked(event: Event){
    this.selectedFile = (event.target as HTMLInputElement).files
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile[0])
    reader.onload = ()=>{
      this.imagePrev = reader.result!.toString();
    }
  }
}
