import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }
  isLoading:Boolean | undefined;
  authStatusSub:Subscription = new Subscription();

  ngOnInit(): void {  
    this.isLoading = false;
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authdata=>{
        this.isLoading = false;
    })
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.loginOwner(form.value.Username, form.value.Password);
    }
    form.resetForm();
  }
  
}
