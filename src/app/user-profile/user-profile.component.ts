import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // displays notifications to user
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { DatePipe, formatDate } from '@angular/common';

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
        public router: Router,
        public helper: HelperService
    ) { }

    @Input() userData = {
        username: '',
        password: '',
        email: '',
        birthDate: ''
    }

    // Variables for form validation
    usernameLengthError: boolean = false;
    usernameTypeError: boolean = false;
    isFormValid:boolean = true;

    ngOnInit(): void {
        this.fetchApiData.getUser(id).subscribe(({username, email, birthDate}) => {
            this.userData["username"] = username;
            this.userData["email"] = email;
            // Convert birthDate (if exists) to year-month-day format (2021-08-01)
            this.userData["birthDate"] =
                this.userData["birthDate"] !== '' ? formatDate(new Date(birthDate), 'yyyy-LL-dd', 'en-US' )
                : birthDate;
        })
    }

    deleteUser(): void {
        if (confirm('Are you sure you want to delete your profile?')) {
            this.fetchApiData.deleteUser(id).subscribe(() => {
                this.snackBar.open('Your profile has been deleted!', 'OK', {
                    duration: 2000
                }).afterDismissed().subscribe(() => {
                    this.router.navigate(['logout']);
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
        if (!this.isFormValid) return;
        this.fetchApiData.editUser(this.userData, localStorage.getItem('userId')).subscribe(() => {
            this.snackBar.open('Your profile has been updated! If you changed your password, you will have to login again.', 'OK', {
                duration: 4000
            }).afterDismissed().subscribe(() => {
                if (this.userData.password) this.router.navigate(['logout']);
            });
        }, (error) => {
            this.snackBar.open('Your profile could not be updated due to an error. Please try again.'
            , 'OK', {
                duration: 4000
            });
        });
    } 

    validateForm() {
        const formErrors = this.helper.validateForm(this.userData.username);
        if (formErrors) {
            formErrors.usernameErrors.length ? this.usernameLengthError = true: this.usernameLengthError = false; 
            formErrors.usernameErrors.type ? this.usernameTypeError = true: this.usernameTypeError = false;
            this.isFormValid = false;
        } else {
            this.usernameLengthError = false;
            this.usernameTypeError = false;
            this.isFormValid = true;
        }
    }
}
