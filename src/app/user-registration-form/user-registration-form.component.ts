import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } 
    from '@angular/material/dialog'; // closes dialog on success
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } 
    from '@angular/material/snack-bar'; // displays notifications to user
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent {
  @Input() userData = { 
      username: '', 
      password: '', 
      email: '', 
      birthDate: '' 
  };
    
  constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router,
        public helper: HelperService) { }

    // Variables for form validation
    usernameLengthError: boolean = false;
    usernameTypeError: boolean = false;
    isFormValid:boolean = true;

    /**
     * Sends form data to API to register user
     * After successful registration, 
     * navigates user back to /welcome, so they can login
     */
    registerUser(): void {
        if (!this.isFormValid) return;
        this.fetchApiData.registerUser(this.userData).subscribe((result) => {   
            this.dialogRef.close(); 
            this.snackBar.open(
                // eslint-disable-next-line max-len
                'You have successfully created a profile! Please login to use myFlix.',
                'OK', {
                    duration: 4000
                }).afterDismissed().subscribe(() => {
                this.router.navigate(['welcome']);
            });
        }, (error) => {
            this.snackBar.open(
                'An error has occurred. Please try again later', 'OK', {
                    duration: 2000
                });
        });
    }

    /**
     * Checks if there are any validation errors <br /> 
     * (username type: must be alphanumeric)
     * (username length: must be >= 6)
     */
    validateForm() {
        const formErrors = this.helper.validateForm(this.userData.username);
        if (formErrors) {
            formErrors.usernameErrors.length 
                ? this.usernameLengthError = true
                : this.usernameLengthError = false; 
            formErrors.usernameErrors.type 
                ? this.usernameTypeError = true
                : this.usernameTypeError = false;
            this.isFormValid = false;
        } else {
            this.usernameLengthError = false;
            this.usernameTypeError = false;
            this.isFormValid = true;
        }
    }
}