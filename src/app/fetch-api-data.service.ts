import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-2021.herokuapp.com/';
const token = localStorage.getItem('token');

@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {
    constructor(private http: HttpClient) {
    }

    movies: any[] = [];
    user: any = null;

    // Make the api call to get all movies
    fetchAllMovies(): Observable<any> {
        if (this.movies.length > 0) {
            const movies = from(this.movies);
            const getMovies = map((movie: object) => {
                return movie;
            });
            return getMovies(movies);
        }
        return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            })}).pipe(
                map((result: any) => {
                    // Only add movie if movie hasn't already been added to movies array
                    if (!this.movies.find((movie: any) => {
                        return movie._id === result._id;
                    })) {
                        const prevMovies = this.movies.slice();
                        prevMovies.push(result);
                        this.movies.push(result);
                    }
                
                    return result || {}
                }),
            catchError(this.handleError)
        );
    }

    // Make the api call to get a single movie
    fetchMovie(name: string): Observable<any> {
        return this.http.get(apiUrl + name, {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    // Make the api call to get a single director
    fetchDirector(name: string): Observable<any> {
        return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })}).pipe(
          catchError(this.handleError)
        );
    }

    // Make the api call to get a single genre
    fetchGenre(genre: string): Observable<any> {
        return this.http.get(apiUrl + 'genres/' + genre, {headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })}).pipe(
          catchError(this.handleError)
        );
    }

    // Make the api call to delete user
    deleteUser(id: any): Observable<any> {
        return this.http.delete(apiUrl + 'users/' + id, {
            responseType: 'text',
            headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

     // Make the api call to delete movie from user's favorite movies list
    deleteUserFavoriteMovie(id: any, movie_id: any): Observable<any> {
        
        return this.http.delete(apiUrl + 'users/' + id +'/favorite-movies/' + movie_id, {
            body: {id, movie_id}, 
            responseType: 'text',
            headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
                map((result) => {
                    if (this.user && this.user.favoriteMovies.includes(movie_id)) 
                    this.user.favoriteMovies = this.user.favoriteMovies.filter((movie: any) => {
                        return movie._id !== movie_id;
                    });
                    return result || {}
                }),
        catchError(this.handleError)
        );
    }

    // Make the api call to edit user's info
    editUser(user: any, id: any): Observable<any> {
        return this.http.patch(apiUrl + 'users/' + id, user, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to get user's info
    fetchUser(id: any): Observable<any> {
        if (this.user) {
            const user = of(this.user);
            const getUser = map((user: object) => {
                return user;
            });
            return getUser(user);
        }
        return this.http.get(apiUrl + 'users/' + id, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
                map((result) => {
                    this.user = result;
                    return result || {}
                }),
        catchError(this.handleError)
        );
    }

    // Make the api call to add a movie to user's favorite movies list
    addUserFavoriteMovie(id: any, movie_id: any): Observable<any> {
        return this.http.patch(apiUrl + 'users/'+ id + '/favorite-movies/' + movie_id, {id, movie_id}, {
            responseType: 'text',
            headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token
            })}).pipe(
                map((result) => {
                    if (this.user && !this.user.favoriteMovies.includes(movie_id)) 
                        this.user.favoriteMovies = [...this.user.favoriteMovies, movie_id];
                    return result || {}
                }),
                catchError(this.handleError)
        );
    }

    // Make the api call to get list of user's favorite movies
    getUserFavoriteMovies(userId: any): Observable<any> {
        return this.http.get(apiUrl + 'users/'+ userId + '/favorite-movies', {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }
    
    // Make the api call to register user
    registerUser(userInfo: object): Observable<any> {
        return this.http.post(apiUrl + 'users', userInfo).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to login user
    loginUser(userInfo: object): Observable<any> {
        return this.http.post(apiUrl + 'login', userInfo, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
            } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
            }
            return throwError(
            'Something bad happened; please try again later.');
    }
}


