import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-2021.herokuapp.com/';
const token = localStorage.getItem('token');

@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {
    constructor(private http: HttpClient) {
    }

    // Make the api call to get all movies
    getAllMovies(): Observable<any> {
        return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    // Make the api call to get a single movie
    getMovie(name: string): Observable<any> {
        return this.http.get(apiUrl + name, {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            })}).pipe(
            catchError(this.handleError)
        );
    }

    // Make the api call to get a single director
    getDirector(name: string): Observable<any> {
        return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })}).pipe(
          catchError(this.handleError)
        );
    }

    // Make the api call to get a single genre
    getGenre(genre: string): Observable<any> {
        return this.http.get(apiUrl + 'genres/' + genre, {headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })}).pipe(
          catchError(this.handleError)
        );
    }

    // Make the api call to delete user
    public deleteUser(id: any): Observable<any> {
        return this.http.delete(apiUrl + 'users/' + id, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

     // Make the api call to delete movie from user's favorite movies list
     public deleteUserFavoriteMovie(id: any, movie_id: any): Observable<any> {
        return this.http.delete(apiUrl + 'users/' + id +'/favorite-movies/' + movie_id, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to edit user's info
    public editUser(id: any): Observable<any> {
        return this.http.patch(apiUrl + 'users/' + id, {id}, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to get user's info
    public getUser(id: string): Observable<any> {
        return this.http.get(apiUrl + 'users/' + id, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to add a movie to user's favorite movies list
    public addUserFavoriteMovie(id: any, movie_id: any): Observable<any> {
        console.log(id);
        return this.http.patch(apiUrl + 'users/'+ id + '/favorite-movies/' + movie_id, {id, movie_id}, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to get list of user's favorite movies
    public getUserFavoriteMovies(userId: any): Observable<any> {
        console.log(userId);
        return this.http.get(apiUrl + 'users/'+ userId + '/favorite-movies', {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
        catchError(this.handleError)
        );
    }
    
    // Make the api call to register user
    public registerUser(userInfo: object): Observable<any> {
        return this.http.post(apiUrl + 'users', userInfo).pipe(
        catchError(this.handleError)
        );
    }

    // Make the api call to login user
    public loginUser(userInfo: object): Observable<any> {
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
