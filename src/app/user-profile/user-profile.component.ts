import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // displays notifications to user
import { Router } from '@angular/router';

const id = localStorage.getItem('userId');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        public router: Router
    ) { }

    @Input() userData = {
        username: '',
        password: '',
        email: '',
        birthday: ''
    }

    ngOnInit(): void {
        this.fetchApiData.fetchUser(id).subscribe(({username, email, birthday}) => {
            this.userData["username"] = username;
            this.userData["email"] = email;
            this.userData["birthday"] = birthday;
        })
    }

    deleteUser(): void {
        if (confirm('Are you sure you want to delete your profile?')) {
            this.fetchApiData.deleteUser(id).subscribe(() => {
                this.snackBar.open('Your profile has been deleted!', 'OK', {
                    duration: 2000
                }).afterDismissed().subscribe(() => {
                    this.router.navigate(['welcome']);
                });
            }, (error) => {
                this.snackBar.open('Your profile could not be deleted due to an error. Please try again.'
                , 'OK', {
                    duration: 4000
                });
            });
        }
    } 

    editUser(): void {
        this.fetchApiData.editUser(this.userData, localStorage.getItem('userId')).subscribe(() => {
            this.snackBar.open('Your profile has been updated! If you changed your password, you will have to login again.', 'OK', {
                duration: 4000
            }).afterDismissed().subscribe(() => {
                if (this.userData.password) this.router.navigate(['welcome']);
            });
        }, (error) => {
            this.snackBar.open('Your profile could not be updated due to an error. Please try again.'
            , 'OK', {
                duration: 4000
            });
        });
    } 
}
