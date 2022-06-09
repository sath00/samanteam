import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-prodedit',
  templateUrl: './prodedit.component.html',
  styleUrls: ['./prodedit.component.css']
})
export class ProdeditComponent implements OnInit {
  isChecked = false;
  constructor(public dialogRef:MatDialogRef<ProdeditComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Product, 
    public productService:ProductService,
    public categoryService: CategoryService
    ) { }

  categoryList: Category[] = this.categoryService.getCategoryList();
  

  selectedFile: any = "";
  imagePrev: string = this.data.imagePath;

  changed: boolean = false;


  tempProduct:Product = {
    _id:this.data._id, 
    name:this.data.name, 
    description:this.data.description, 
    availability:this.data.availability, 
    category:this.categoryList[this.categoryList.findIndex(cat=>cat.name==this.data.category.name)],
    price:this.data.price,
    imagePath:this.data.imagePath
  }

  ngOnInit(): void {
    if(this.data.availability=='Available'){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
    
  }

  onSaveChanges(): void {
    // this.data.name = this.tempProduct.name;
    if(this.isChecked){
      this.tempProduct.availability = 'Available';
    }else{
      this.tempProduct.availability = 'Not Available';
    }
    // this.data.category = this.tempProduct.category;
    // this.data.description = this.tempProduct.description;
    // this.data.price = this.tempProduct.price;
    // this.data.imagePath = this.tempProduct.imagePath;
    
    if(this.changed){
      this.selectedFile = this.selectedFile[0];
    }else{
      this.selectedFile = null;
    }


    this.productService.updateProduct(this.tempProduct,this.selectedFile);
    

    this.dialogRef.close();
  }

  onImagePicked(event: Event) {
    this.changed = true; //a new image was picked
    this.selectedFile = (event.target as HTMLInputElement).files
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile[0])
    reader.onload = () => {
      this.imagePrev = reader.result!.toString();
    }
  }

}
