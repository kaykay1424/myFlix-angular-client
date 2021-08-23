import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // closes dialog on success
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // displays notifications to user
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
    @Input() userData = { 
        username: '', 
        password: ''
    };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit(): void {}

    loginUser(): void {
        
        this.fetchApiData.loginUser(this.userData).subscribe((result) => {
        localStorage.setItem('userId', result.user._id);
        localStorage.setItem('username', result.user.username)
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); 
        this.snackBar.open('You are now logged in!', 'OK', {
            duration: 4000
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['movies']);
        });
        
    }, (error) => {
            this.snackBar.open('An error has occurred. Please try again later', 'OK', {
                duration: 4000
            });
        });
    }
}
