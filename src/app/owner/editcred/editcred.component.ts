import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-editcred',
  templateUrl: './editcred.component.html',
  styleUrls: ['./editcred.component.css']
})
export class EditcredComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthenticationService) { }


  tempCredentials={
    username:"",
    password:""
  };

  // private credentialsSubscription: Subscription = new Subscription();
  // private passwordValidationSubscription: Subscription = new Subscription();

  ngOnInit() {
    // this.authService.getCredentials()
    // this.credentialsSubscription = this.authService.getCredentialListener()
    // .subscribe((creds:any)=>{
    //   this.tempCredentials = creds[0]
    // })
  }

  ngOnDestroy() {
    //this.credentialsSubscription.unsubscribe();

  }

  onSubmit(form: NgForm){
    this.authService.updateCredentials(form.value.username,form.value.currentPassword,form.value.newPassword)
  }

  
}
