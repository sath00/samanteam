import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-invdash',
  templateUrl: './invdash.component.html',
  styleUrls: ['./invdash.component.css']
})
export class InvdashComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
