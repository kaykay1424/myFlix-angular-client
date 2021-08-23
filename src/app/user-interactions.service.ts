import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {
    constructor() { }

    selectedGenre: any = null;
    selectedDirector: any = null;
    selectedMovie: any = null;
    userMenuDropdownOpen: any = false;
    
    getSelectedGenre() {
        return this.selectedGenre;
    }

    getSelectedDirector() {
        return this.selectedDirector;
    }

    getSelectedMovie() {
        return this.selectedMovie;
    }

    getUserDropdownMenuOpen() {
        return this.userMenuDropdownOpen;
    }

    setSelectedGenre(genre: object): void {
        this.selectedGenre = genre;
    } 

    setSelectedDirector(director: object): void {
        this.selectedDirector = director;
    }

    setSelectedMovie(movie: object): void {
        this.selectedMovie = movie;
    }

    setUserDropdownMenuOpen(open: boolean) {
        this.userMenuDropdownOpen = open;
    }
}
