import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catadd',
  templateUrl: './catadd.component.html',
  styleUrls: ['./catadd.component.css']
})
export class CataddComponent implements OnInit {
  
  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onAddCategory(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.categoryService.addCategory(form.value.CategoryName);
    form.resetForm();
  }

}
