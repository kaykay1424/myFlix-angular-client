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
    username: any = localStorage.getItem('username');

  ngOnInit(): void {
      this.getUser();
      this.getUserDropdownMenu();
  }

 ngOnChanges(changes: SimpleChanges) {
     this.currentRoute = changes.currentRoute.currentValue;
        console.log(changes.currentRoute.currentValue);
  }

  getUser(): void {
    const userId = localStorage.getItem('userId');
    if (!userId && !this.username) {
        this.fetchApiData.fetchUser(userId).subscribe((resp: any) => {
            this.username = resp.username;
        });
    } else {
        this.username = localStorage.getItem('username');
    }
  }

  getUserDropdownMenu() {
    this.open = this.userInteractons.getUserDropdownMenuOpen();
  }

  toggleDropdownMenu(): void {
    this.userInteractons.setUserDropdownMenuOpen(!this.open);
    this.getUserDropdownMenu();
  }

}
