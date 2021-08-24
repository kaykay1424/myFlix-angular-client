import { Component, Input, OnInit } from '@angular/core';
import { UserInteractionsService } from '../user-interactions.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

    constructor(public userInteractions: UserInteractionsService,
        ) { }

    selectedGenre = this.userInteractions.getSelectedGenre();

    ngOnInit(): void {
        
        
    }

}
