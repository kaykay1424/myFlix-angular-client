import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

    constructor() { }

    validateForm(username: string, passwords?: any) {
        let errors: any = {};
        
        
        if (passwords) {
            if (!this.validatePasswords(passwords.password1, passwords.password2)) {
                errors['passwordErrors'] = true;
            }
        }

        const usernameErrors: any = this.validateUsername(username);
        if (usernameErrors) errors['usernameErrors'] = usernameErrors;

        return Object.keys(errors).length > 0 ? errors: null;
    }

    validatePasswords(password1: string, password2: string) {
        // If both passwords don't match
        return (password1 !== '' && (password1 !== password2))
        ? false
        : true;
    }

    validateUsername(username: string) {
        let errors: any = {};
        
        // Check that username is at least 6 characters
        // and only contains alphanumeric characters
        if (username.length < 6) errors['length'] = true;     
        const nonAlphaCharacters = username.match(/\W/g);
                
        // If there are non alphabetical characters 
        // make sure that they are only numbers
        if (nonAlphaCharacters) {
            for (let i = 0; i < nonAlphaCharacters.length; i++) {
                if (!nonAlphaCharacters[i].match(/\d/))
                    errors['type'] = true;
                break;
            }
        } 
        

        return Object.keys(errors).length > 0 ? errors: null;
    }
}
