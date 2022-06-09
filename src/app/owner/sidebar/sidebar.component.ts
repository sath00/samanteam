import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service'
import { MatDialog} from '@angular/material/dialog';
import { EditcredComponent } from '../editcred/editcred.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthenticationService, private dialog:MatDialog) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logoutOwner()
  }

  onEditCred():void {
    const dialogRef = this.dialog.open(EditcredComponent, {
    })
  }
}
