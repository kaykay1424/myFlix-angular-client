import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserInteractionsService {
    constructor() { }

    selectedGenre: any = null;
    selectedDirector: any = null;
    selectedMovie: any = null;
    
    getSelectedGenre() {
        return this.selectedGenre;
    }

    getSelectedDirector() {
        return this.selectedDirector;
    }

    getSelectedMovie() {
        return this.selectedMovie;
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
}
