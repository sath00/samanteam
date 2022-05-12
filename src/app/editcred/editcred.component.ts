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
  previousCredentials:any;
  private credentialsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.authService.getCredentials()
    this.credentialsSubscription = this.authService.getCredentialListener()
    .subscribe((creds)=>{
      this.previousCredentials = creds
      console.log(this.previousCredentials)
    })
  }

  ngOnDestroy() {
    this.credentialsSubscription.unsubscribe()
  }
}
