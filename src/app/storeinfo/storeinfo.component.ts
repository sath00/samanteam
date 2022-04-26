import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.css']
})
export class StoreinfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSaveDetails(form: NgForm) {

    if (form.invalid) {
      return;
    }
    form.resetForm();
  }

}
