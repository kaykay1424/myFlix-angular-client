import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // closes dialog on success
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // displays notifications to user
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { 
        username: '', 
        password: '', 
        email: '', 
        birthdate: '' 
    };
    
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router) { }

    ngOnInit(): void {}

    // Send form data to API to login user
    registerUser(): void {
        this.fetchApiData.registerUser(this.userData).subscribe((result) => {   
        this.dialogRef.close(); 
            this.snackBar.open('You have successfully created a profile! Please login to use myFlix.', 'OK', {
                duration: 4000
            }).afterDismissed().subscribe(() => {
                this.router.navigate(['welcome']);
            });;
        }, (error) => {
            this.snackBar.open('An error has occurred. Please try again later', 'OK', {
                duration: 2000
            });
        });
    }
}