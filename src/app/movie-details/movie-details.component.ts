import { Component, OnInit } from '@angular/core';
import { UserInteractionsService } from '../user-interactions.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(public userInteractions: UserInteractionsService ) { }

    movie: any = {};
    ngOnInit(): void {
        this.getMovie();
    }

    getMovie() {
        this.movie = this.userInteractions.getSelectedMovie();
    }
}
