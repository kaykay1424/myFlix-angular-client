import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserInteractionsService } from '../user-interactions.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFavoriteMoviesComponent } 
    from '../user-favorite-movies/user-favorite-movies.component';
import { MovieDetailsComponent } 
    from '../movie-details/movie-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
    allMovies: any[] = [];
    movies: any[] = [];
    movieId: any = null;
    userFavoriteMovies: any[] = [];
    selectedGenre: string = '';
    isMovieFavorited: any = null;
    user: any = {};

    constructor(
        public fetchApiData: FetchApiDataService,
        public userInteractions: UserInteractionsService,
        public dialog: MatDialog,
        public router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.dialog.closeAll();
        this.getMovieIdParam();
        this.getMovies();
        this.getUserFavoriteMovies();  
    }

    /**
     * Adds movie to user's favorites list 
     * if it doesn't already exist in that list
     * @param movie 
     */
    addUserFavoriteMovie(movie: any): void {
        /* If movie already exists in user's favorites list 
            exit function
        */
        if (this.userFavoriteMovies.includes(movie._id)) {
            alert(
                // eslint-disable-next-line max-len
                'You have already added this movie to your list. Try adding another one.');
            return;
        }

        this.fetchApiData.addUserFavoriteMovie(movie._id)
            .subscribe((result) => {
                this.userFavoriteMovies.push(movie._id);
                this.openFavoriteMoviesDialog();
            });
    }

    /**
     * Gets array of all movies and sets movies variables to all of them 
     * or just one if a movie id parameter is present in the url 
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.allMovies = resp;

            // If url is for a single movie only return that movie
            this.movieId 
                ? this.movies = resp.filter((movie: any) => {
                    return this.movieId === movie._id;
                })
                : this.movies = resp;
        });
    }

    /**
     * Checks if movie id param is present in url
     * and sets movieId to that value 
     */
    getMovieIdParam(): void {
        this.route.paramMap.subscribe(paramMap => {
            const movieId = paramMap.get('id');
            if (movieId) this.movieId = movieId;
        });
    }

    /**
     * Gets list of user's favorite movies
     */
    getUserFavoriteMovies(): void {
        this.fetchApiData.getUser().subscribe((user) => {
            this.userFavoriteMovies = user.favoriteMovies.map((id: any) => {
                return id;
            });
        });
    }

    /** 
     * Opens dialog with genre info for movie 
     * when the genre button is clicked <br />
     * Sets selected genre to genre param
     * so Genre component can know which genre to show
     * @param genre object
     */  
    openGenreDialog(genre: object): void {
        this.userInteractions.setSelectedGenre(genre);
        this.dialog.open(GenreComponent);
    }

    /** 
     * Opens dialog with director info for movie 
     * when the director button is clicked <br />
     * Sets selected director to director param
     * so Director component can know which director to show
     * @param director object
     */  
    openDirectorDialog(director: object): void {
        this.userInteractions.setSelectedDirector(director);
        this.dialog.open(DirectorComponent);
    }

    /** Opens dialog with list of user's favorite movies
     * when the star icon is clicked 
     */ 
    openFavoriteMoviesDialog(): void {
        this.dialog.open(UserFavoriteMoviesComponent)
            .afterClosed().subscribe(() => {
                this.getUserFavoriteMovies();
            });
    }

    /** 
     * Opens dialog with details of movie 
     * when the details button is clicked <br />
     * Sets selectedMovie to movie param
     * so MovieDetails component can know which movie to show
     * @param movie object
     */  
    openMovieDialog(movie: object): void {
        this.userInteractions.setSelectedMovie(movie);
        this.dialog.open(MovieDetailsComponent);
    }

    /**
     * Searches list of movies for list of movies whose names match search value
     * and sets this.movies to that list
     * @param event keydown
     */
    searchMovies(event: any): void {
        const search = event.target.value,
            filteredMovies = this.allMovies.filter((movie) => {
                return movie.name.toLowerCase().match(search.toLowerCase());
            });

        this.movies = filteredMovies;
    }
}