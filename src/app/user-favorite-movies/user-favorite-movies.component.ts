import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
    selector: 'app-user-favorite-movies',
    templateUrl: './user-favorite-movies.component.html',
    styleUrls: ['./user-favorite-movies.component.scss']
})

export class UserFavoriteMoviesComponent implements OnInit {

    constructor(public fetchApiData: FetchApiDataService) { }

    user: any = {};
    userFavoriteMovies: any[] = [];

    ngOnInit(): void {
        this.getUserFavoriteMoviesIds();
    }

    /**
     * Deletes movie with movieId from user's favorites list
     * @param movieId
     */
    deleteUserFavoriteMovie(movieId: string) {
        this.fetchApiData.deleteUserFavoriteMovie(movieId).subscribe(() => {
            const filteredMovies = this.userFavoriteMovies.filter((movie) => {
                return movie._id !== movieId;
            });
            this.userFavoriteMovies = filteredMovies;
        });
    }

    /**
     * Get list of user's favorite movies (list only contains ids of movies)
     */
    getUserFavoriteMoviesIds() {
        this.fetchApiData.getUser().subscribe((result: any) => {
            this.getUserFavoriteMovies(result.favoriteMovies);
        });
    }

    /**
     * Convert list of user's favorite movies' ids (array of strings)
     * to list that contains all movie's info 
     * for each movie id (array of objects)
     * and sets this.userFavoriteMovies to that list
     * @param favoriteMovies 
     */
    getUserFavoriteMovies(favoriteMovies: string[]): void {
        this.fetchApiData.getAllMovies().subscribe((movies) => {
            this.userFavoriteMovies = movies.filter((movie: any) => {
                return favoriteMovies.includes(movie._id);
            });
        });
    }
}
