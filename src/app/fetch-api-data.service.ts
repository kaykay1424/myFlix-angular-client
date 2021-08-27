import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { 
    HttpClient, 
    HttpHeaders, 
    HttpErrorResponse 
} 
    from '@angular/common/http';
import { Observable, of, from, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-2021.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {
    constructor(private http: HttpClient) {
    }

    movies: any[] = [];
    user: any = null;
    userId: any = localStorage.getItem('userId') 
        ? localStorage.getItem('userId')
        : null;
    token: any = localStorage.getItem('token') 
        ? localStorage.getItem('token'): null;

    /**
     * Gets list of movies stored in this.movies (if user is already logged in)
     * or list of movies from API
     * @returns array of movies
     */
    getAllMovies(): Observable<any> {
        if (this.movies.length > 0) {
            const movies = from(this.movies);
            const getMovies = map((movie: object) => {
                return movie;
            });
            return getMovies(movies);
        }
     
        return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.token,
            })}).pipe(
            map((result: any) => {
                /* Only add movie 
                    if movie hasn't already been added to movies array
                */
                if (!this.movies.find((movie: any) => {
                    return movie._id === result._id;
                })) {
                    const prevMovies = this.movies.slice();
                    prevMovies.push(result);
                    this.movies.push(result);
                }
                
                return result || {};
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Make the api call to get a single movie by name
     * @param name
     * @returns movie object
     */
    getMovie(name: string): Observable<any> {
        return this.http.get(apiUrl + name, {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Make the api call to get a single director by name
     * @param name
     * @returns director object
     */
    getDirector(name: string): Observable<any> {
        return this.http.get(apiUrl + 'directors/' + name, 
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + this.token,
                })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to get a single genre by name
     * @param name
     * @returns genre object
     */
    getGenre(genre: string): Observable<any> {
        return this.http.get(apiUrl + 'genres/' + genre, 
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + this.token,
                })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to delete user
     * @returns text
     */
    deleteUser(): Observable<any> {
        return this.http.delete(apiUrl + 'users/' + this.userId, {
            responseType: 'text',
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + this.token,
                })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to delete movie from user's favorite movies list
     * @returns text
     */
    deleteUserFavoriteMovie(movie_id: string): Observable<any> {
        return this.http.delete(apiUrl + 'users/' + 
        this.userId +'/favorite-movies/' + movie_id, {
            body: {_id: this.userId, movie_id}, 
            responseType: 'text',
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + this.token,
                })}).pipe(
            map((result) => {
                /* Remove movie from user's favorites list 
                    if it exists in user's list
                */
                if (this.user && this.user.favoriteMovies.includes(movie_id))
                     
                    this.user.favoriteMovies 
                    = this.user.favoriteMovies.filter((movieId: any) => {
                            return movieId !== movie_id;
                        });
                return result || {};
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to edit user's info
     * @param user object
     * @returns user object (properties that have been updated)
     */
    editUser(user: any): Observable<any> {
        return this.http.patch(apiUrl + 'users/' + 
        this.userId, user, {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to get user's info
     * @returns user object 
     */
    getUser(): Observable<any> {
        if (this.user) {
            const user = of(this.user);
            const getUser = map((user: object) => {
                return user;
            });
            return getUser(user);
        } 

        return this.http.get(apiUrl + 'users/' + 
        this.userId, {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.token,
            })}).pipe(
            map((result) => {
                this.user = result;
                return result || {};
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to add a movie to user's favorite movies list
     * @param movie_id 
     * @returns text
     */
    addUserFavoriteMovie(movie_id: string): Observable<any> {
        return this.http.patch(apiUrl + 'users/'+ 
        this.userId + '/favorite-movies/' + movie_id, 
        {_id: this.userId, movie_id}, {
            responseType: 'text',
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + this.token
                })}).pipe(
            map((result) => {
                /* Add movie to user's favorites list 
                    if movie exists in their list
                */
                if (this.user && !this.user.favoriteMovies.includes(movie_id)) 
                    this.user.favoriteMovies 
                    = [...this.user.favoriteMovies, movie_id];
                return result || {};
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to get list of user's favorite movies
     * @returns array of movie ids
     */
    getUserFavoriteMovies(): Observable<any> {
        return this.http.get(apiUrl + 'users/'+ 
        this.userId + '/favorite-movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to register user
     * @returns user object
     */
    registerUser(userInfo: object): Observable<any> {
        return this.http.post(apiUrl + 'users', userInfo).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Makes the api call to login user
     * @returns user object and auth token
     */
    loginUser(userInfo: object): Observable<any> {
        return this.http.post(apiUrl + 'login', userInfo).pipe(
            map((result: any) => { 
                this.user = result.user;
                this.userId = result.user._id;
                this.token = result.token;
                return result || {};
            }),
            catchError(this.handleError)
        );
    }

    /** Logout user by resetting user variables */
    logoutUser() {
        this.user = null;
        this.userId = null;
        this.token = null;
    }

    /**
     * Handles errors from unsuccessful API calls
     * @param error 
     * @returns status code
     */
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            // eslint-disable-next-line no-console
            console.error('Some error occurred:', error.error.message);
        } else {
            // eslint-disable-next-line no-console
            console.error(
                `Error Status code ${error.status}, ` +
            `Error body is: ${error.error}`);
        }
        return throwError(
            error.status);
    }
}


