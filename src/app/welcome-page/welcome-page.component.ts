import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } 
    from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } 
    from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent {
    constructor(public dialog: MatDialog) { }
    
    /** Opens dialog with registration form when the signup button is clicked */
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent);
    }

    /** Opens dialog with login form when the login button is clicked */
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent);
    }
}