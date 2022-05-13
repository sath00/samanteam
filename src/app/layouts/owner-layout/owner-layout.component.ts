import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-owner-layout',
  templateUrl: './owner-layout.component.html',
  styleUrls: ['./owner-layout.component.css']
})
export class OwnerLayoutComponent implements OnInit, OnDestroy {

  constructor(public router: Router, private authService: AuthenticationService) { }
  private authListenerSubscription: Subscription = new Subscription;
  isAuthenticated = false;
  
  ngOnInit() {
    this.authService.autoAuthOwner()
    this.isAuthenticated = this.authService.getAuth()
    this.authListenerSubscription = this.authService.getAuthStatusListener()
    .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
    })
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe()
  } 

}
