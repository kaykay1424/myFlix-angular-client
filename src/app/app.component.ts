import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';
import { UserInteractionsService } from './user-interactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(public router: Router,
        public userInteractions: UserInteractionsService,
        public fetchApiData: FetchApiDataService) {}
        route = '';
        
    onRouterOutletActivate(event: any): void {
        this.route = this.router.url;

        /**  If user is not logged in and is on a page other than the welcome page,
            send user to welcome page
        */ 
        if (!localStorage.getItem('userId') && this.router.url !== '') {
            this.router.navigate(['welcome']);
        }
        /**  If user is logged in and is on welcome page,
            send user to movies page
        */
        if (localStorage.getItem('userId') && this.route === '/welcome') {
            this.router.navigate(['movies']);
        }
        /**  If user is logged in but their credentials are invalid,
            log them out
        */
        this.fetchApiData.getUser(localStorage.getItem('userId') || null).subscribe((user) => {
        }, (error) => {
           if (error === 401) {
                this.router.navigate(['/logout']);
           } 
        });   
    }
    
}
