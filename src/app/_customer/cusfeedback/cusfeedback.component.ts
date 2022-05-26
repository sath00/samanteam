import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cusfeedback',
  templateUrl: './cusfeedback.component.html',
  styleUrls: ['./cusfeedback.component.css']
})
export class CusfeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitFB(form: NgForm) {

    if (form.invalid) {
      return;
    }
    form.resetForm();
  }

}
