import { 
    Component, 
    Input, 
    OnChanges, 
    OnInit , 
    SimpleChanges
} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserInteractionsService } from '../user-interactions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

    constructor(public userInteractons: UserInteractionsService,
        public fetchApiData: FetchApiDataService,
        public router: Router) { }

    @Input() currentRoute:any = ''; // route passed from App component
    dropDownMenuOpen: boolean = false;
    username: any = null;

    ngOnInit(): void {
        this.checkRoute();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currentRoute = changes.currentRoute.currentValue;
        this.dropDownMenuOpen = false;
        this.checkRoute();
    }

    /**
     * Checks whether the route is 
     * one a logged in user has access to (/movies, /profile, /logout)
     * and if so gets username to show in navbar
     * and if not sets username to null, because user should not be logged in
     */
    checkRoute(): void {
        /* Only get user info, 
            if user is logged in 
            (if currentRoute is not /welcome, user is logged in)
        */
        if (this.currentRoute !== '/welcome' && this.currentRoute !== '') {
            this.getUsername();            
        } else {
            this.username = null;
        }
    }

    /** Gets user's username */
    getUsername(): void {
        this.fetchApiData.getUser().subscribe((user) => {
            this.username = user.username;
        });
    }

    /**
     * Toggles user dropdown menu between open(true) and collapsed(false)
     */
    toggleDropdownMenu(): void {
        this.dropDownMenuOpen = !this.dropDownMenuOpen;
    }
}
