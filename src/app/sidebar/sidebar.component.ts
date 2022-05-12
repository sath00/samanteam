import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logoutOwner()
  }

}
