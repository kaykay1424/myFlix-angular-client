import { Component, OnInit } from '@angular/core';
import { UserInteractionsService } from '../user-interactions.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

    constructor(public userInteractions: UserInteractionsService,
        public helper: HelperService) { }

    selectedDirector = this.userInteractions.getSelectedDirector();

    ngOnInit(): void {
    }

}
