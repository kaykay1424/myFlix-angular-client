import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { UserFavoriteMoviesComponent } from './user-favorite-movies/user-favorite-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { MaterialModule } from './material/material.module';

const appRoutes: Routes = [
    { 
        path: 'welcome', 
        component: WelcomePageComponent 
    },
    {
        path: 'logout',
        component: UserLogoutComponent
    },
    { 
        path: 'movies', 
        component: MovieCardComponent 
    },
    { 
        path: 'profile', 
        component: UserProfileComponent
    },
    { 
        path: '', 
        redirectTo: 'welcome', 
        pathMatch: 'prefix' 
    },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    NavbarComponent,
    GenreComponent,
    DirectorComponent,
    UserFavoriteMoviesComponent,
    MovieDetailsComponent,
    UserLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
