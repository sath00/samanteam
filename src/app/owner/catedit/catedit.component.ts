import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-catedit',
  templateUrl: './catedit.component.html',
  styleUrls: ['./catedit.component.css']
})
export class CateditComponent implements OnInit {

  isChecked = false;

  constructor(public dialogRef:MatDialogRef<CateditComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Category, 
    public categoryService: CategoryService
    ) { }

  categoryList: Category[] = this.categoryService.getCategoryList();

  tempCategory:Category = {
    _id:this.data._id, 
    name:this.data.name
  }

  ngOnInit(): void {
  }

  onSaveChanges(): void {
    this.data.name = this.tempCategory.name;
    this.categoryService.updateCategory(this.tempCategory)
    this.dialogRef.close();
  }
}
