import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';


@Component({
  selector: 'app-editcred',
  templateUrl: './editcred.component.html',
  styleUrls: ['./editcred.component.css']
})
export class EditcredComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthenticationService) { }
  
  validCurrentPassword:any;

  tempCredentials={
    username:"",
    password:""
  };

  private credentialsSubscription: Subscription = new Subscription();
  private passwordValidationSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.authService.getCredentials()
    this.credentialsSubscription = this.authService.getCredentialListener()
    .subscribe((creds:any)=>{
      this.tempCredentials = creds[0]
    })
    this.authService.validatePassword("");
    this.passwordValidationSubscription = this.authService.getValidationListener()
    .subscribe((isValid:any)=>{
      this.validCurrentPassword = isValid;
    })
  }

  ngOnDestroy() {
    this.credentialsSubscription.unsubscribe();
    this.passwordValidationSubscription.unsubscribe()
  }

  async onSubmit(form: NgForm){
    console.log("editcomp:" + await this.authService.validatePassword(form.value.currentPassword))
  }

  
}
