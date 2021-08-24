import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserInteractionsService } from '../user-interactions.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFavoriteMoviesComponent } from '../user-favorite-movies/user-favorite-movies.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

const userId = localStorage.getItem('userId');
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
    allMovies: any[] = [];
    movies: any[] = [];
    userFavoriteMovies: any[] = [];
    selectedGenre: string = '';
    isMovieFavorited: any = null;
    user: any = {};

    constructor(
        public fetchApiData: FetchApiDataService,
        public userInteractions: UserInteractionsService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getMovies();
        this.getUserFavoriteMovies();
    }

    favoriteMovie(movie: any): void {
        if (this.userFavoriteMovies.includes(movie._id)) {
            alert('You have already added this movie to your list. Try adding another one.')
            return;
        }
        this.fetchApiData.addUserFavoriteMovie(userId, movie._id).subscribe((result) => {
            this.openFavoriteMoviesDialog(movie._id);
        });
    }

    getMovies(): void {
        this.fetchApiData.fetchAllMovies().subscribe((resp: any) => {
            console.log(resp)
            this.allMovies = resp;
            this.movies = resp;
        });
    }

    getUserFavoriteMovies(): void {
        this.fetchApiData.fetchUser(userId).subscribe((user) => {
            
            this.userFavoriteMovies = user.favoriteMovies.map((id: any) => {
                return id;
            });
        })
    }

    // Open dialog when the genre button is clicked  
    openGenreDialog(genre: object): void {
        this.userInteractions.setSelectedGenre(genre);
        this.dialog.open(GenreComponent, {
            // width: '500px'
        });
    }

    // Open dialog when the director button is clicked  
    openDirectorDialog(director: object): void {
        this.userInteractions.setSelectedDirector(director);
        this.dialog.open(DirectorComponent, {
            // width: '500px'
        });
    }

    // Open dialog when the favorite button is clicked  
    openFavoriteMoviesDialog(director: object): void {
        this.userInteractions.setSelectedDirector(director);
        this.dialog.open(UserFavoriteMoviesComponent, {
            // width: '500px'
        });
    }

     // Open dialog when the Details button is clicked  
     openMovieDialog(movie: object): void {
        this.userInteractions.setSelectedMovie(movie);
        this.dialog.open(MovieDetailsComponent, {
            // width: '500px'
        });
    }

    searchMovies(event: any): void {
        const search = event.target.value,
            filteredMovies = this.allMovies.filter((movie) => {
            return movie.name.toLowerCase().match(search.toLowerCase());
        });

        this.movies = filteredMovies;
    }
}