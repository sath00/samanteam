import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    console.log("Username:" + form.value.Username + "\nPassword:" + form.value.Password)

    if (form.valid) {
      this.authService.login(form.value.Username, form.value.Password);
    } else {
      return
    }

    form.resetForm();
  }
}
