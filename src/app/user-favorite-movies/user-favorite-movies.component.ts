import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

const userId = localStorage.getItem('userId');

@Component({
  selector: 'app-user-favorite-movies',
  templateUrl: './user-favorite-movies.component.html',
  styleUrls: ['./user-favorite-movies.component.scss']
})

export class UserFavoriteMoviesComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService ) { }

  user: any = {};
  userFavoriteMovies: any[] = [];

  ngOnInit(): void {
    this.getUser();
  }

  deleteUserFavoriteMovie(movieId: any) {
    this.fetchApiData.deleteUserFavoriteMovie(userId, movieId).subscribe(() => {
        const filteredMovies = this.userFavoriteMovies.filter((movie) => {
            return movie._id !== movieId;
        });
        this.userFavoriteMovies = filteredMovies;
    });
  }

  getUser() {
    this.fetchApiData.fetchUser(userId).subscribe((result: any) => {
        this.user = result;
        this.getUserFavoriteMovies();
    });
  }

  getUserFavoriteMovies(): void {
    this.fetchApiData.fetchAllMovies().subscribe((movies) => {
        this.userFavoriteMovies = movies.filter((movie: any) => {
            return this.user.favoriteMovies.includes(movie._id);
        })
    })
  }

}
