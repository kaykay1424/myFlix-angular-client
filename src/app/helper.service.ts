import { Injectable } from '@angular/core';
import {parse} from 'angular-html-parser';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

    constructor() { }

    // Break long text into readable paragraphs
    makeTextReadable(text: string) {
        const textArray = text.split('');
        textArray.unshift('<p>');
        const indexesArray = [];
        let numParagraphs = 0;

        for (let i = 0; i < textArray.length; i++) {        
            // Add a paragraph after every 5 sentences
            if (textArray[i] === '.' && textArray[i+1] === ' ') {
                numParagraphs++;
                if (numParagraphs === 5) {
                    indexesArray.push(i+1);
                    numParagraphs = 0;
                    textArray.splice(i+1, 0, '</p><p>');
                }
            }
        
        }
   
        return textArray.join(''); // render as html
    };

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
