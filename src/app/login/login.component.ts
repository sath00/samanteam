import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
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
    if (form.valid) {
      this.authService.loginOwner(form.value.Username, form.value.Password);
    }
    form.resetForm();
  }
}
