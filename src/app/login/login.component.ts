import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    console.log("Username:" + form.value.Username + "\nPassword:" + form.value.Password)

    //insert credentials validation API

    //if wrong username/password
      //prompt incorrect credentials
    //if correct
      //login then go to customer home page

    form.resetForm();
  }
}
