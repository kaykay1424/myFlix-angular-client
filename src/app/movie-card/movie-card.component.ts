import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserInteractionsService } from '../user-interactions.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFavoriteMoviesComponent } from '../user-favorite-movies/user-favorite-movies.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
    movies: any[] = [];
    selectedGenre: string = '';
    constructor(
        public fetchApiData: FetchApiDataService,
        public userInteractions: UserInteractionsService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    favoriteMovie(movie: any): void {
        this.fetchApiData.addUserFavoriteMovie(localStorage.getItem('userId'), movie._id).subscribe((result) => {
            this.openFavoriteMoviesDialog(movie._id);
        });
    }

    getMovies(): void {
        // const movies = this.fetchApiData.getAllMovies();

        // if (movies.length === 0) {
            this.fetchApiData.fetchAllMovies().subscribe((resp: any) => {
                console.log(resp)
                this.movies = resp;
            });
        // } else {
        //     this.movies = movies[0];
        // }
    }

    // Open dialog when the genre button is clicked  
    openGenreDialog(genre: object): void {
        this.userInteractions.setSelectedGenre(genre);
        this.dialog.open(GenreComponent, {
            width: '500px'
        });
    }

    // Open dialog when the director button is clicked  
    openDirectorDialog(director: object): void {
        this.userInteractions.setSelectedDirector(director);
        this.dialog.open(DirectorComponent, {
            width: '500px'
        });
    }

    // Open dialog when the favorite button is clicked  
    openFavoriteMoviesDialog(director: object): void {
        this.userInteractions.setSelectedDirector(director);
        this.dialog.open(UserFavoriteMoviesComponent, {
            width: '500px'
        });
    }

     // Open dialog when the Details button is clicked  
     openMovieDialog(movie: object): void {
        this.userInteractions.setSelectedMovie(movie);
        this.dialog.open(MovieDetailsComponent, {
            width: '500px'
        });
    }
}