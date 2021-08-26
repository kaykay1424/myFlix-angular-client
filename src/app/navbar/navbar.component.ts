import { Component, Input, OnChanges, OnInit , SimpleChanges} from '@angular/core';
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

    @Input() currentRoute:any = '';
    open: boolean = false;
    username: any = null;

    ngOnInit(): void {
       this.checkRoute();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currentRoute = changes.currentRoute.currentValue;
        this.userInteractons.setUserDropdownMenuOpen(false);
        this.checkRoute();
    }

    checkRoute(): void {
        this.toggleDropdownMenu(true);
        // Only get user info, if user is logged in (if currentRoute is not /welcome, user is logged in)
        if (this.currentRoute !== '/welcome' && this.currentRoute !== '') {
            this.getUser();            
        } else {
            this.username = null;
        }
    }

    getUser(): void {
        this.fetchApiData.getUser(localStorage.getItem('userId')).subscribe((user) => {
            this.username = user.username;
        });
    }

    getUserDropdownMenu() {
        this.open = this.userInteractons.getUserDropdownMenuOpen();
    }

    toggleDropdownMenu(open: boolean): void {
        this.userInteractons.setUserDropdownMenuOpen(!open);
        this.getUserDropdownMenu();
    }
}
