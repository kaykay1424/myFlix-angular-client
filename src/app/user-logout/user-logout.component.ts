import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(
      public router: Router
  ) { }

  ngOnInit(): void {
      this.logoutUser();
  }

  logoutUser(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
