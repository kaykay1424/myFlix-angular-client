import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserInteractionsService } from './user-interactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(public router: Router,
        public userInteractions: UserInteractionsService) {}
        route = '';
        
    onRouterOutletActivate(event: any): void {
        this.route = this.router.url;

        if (!localStorage.getItem('userId') && this.router.url !== '') {
            this.router.navigate(['welcome']);
        }
        if (localStorage.getItem('userId') && this.route === '/welcome') {
            this.router.navigate(['movies']);
        }
    }
    
}
