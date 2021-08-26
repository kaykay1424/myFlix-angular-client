import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

    constructor (
        public router: Router,
        public fetchApiData: FetchApiDataService
    ) { }

    ngOnInit(): void {
        this.logoutUser();
    }

    logoutUser(): void {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.fetchApiData.logoutUser();
        this.router.navigate(['']);
    }

}
