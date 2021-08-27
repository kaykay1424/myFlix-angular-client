import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } 
    from '@angular/material/snack-bar'; // displays notifications to user
@Component({
    selector: 'app-user-logout',
    templateUrl: './user-logout.component.html',
    styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

    constructor (
        public router: Router,
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.logoutUser();
    }

    /**
     * Logs user out by removing userId and token from local storage
     * and stored user variables in fetchApiDataService (user, userId, token)
     * After logout, user is taken to /welcome
     */
    logoutUser(): void {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.fetchApiData.logoutUser();
        this.snackBar.open('You are now logged out!', 'OK', {
            duration: 4000
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['welcome']);            
        });
    }
}
