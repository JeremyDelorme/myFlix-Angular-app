import { Component, OnInit } from '@angular/core';
import { fetchApiData } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: fetchApiData,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    this.getCurrentUser();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets favorite movies from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * Checks if a movie is included in the user's list of favorite movies
   * @param id 
   * @returns true, if the movie is a favorite move, else false
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
  * Opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
  * Opens the user director dialog from DirectorComponent to displaying details
  * @param name
  * @param bio
  * @param birthday
  */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * Opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      console.log(resp)
      const currentUser = resp.Username
      console.log(currentUser)
      const currentFavs = resp.favoriteMovies
      console.log(currentFavs)
    });
  }

  /**
   * Adds a movie to the list of favorite movies via an API call
   * @param id 
   * @function addToFavoriteMovies
   */
  addToFavoriteMovies(id: string, title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from the list of favorite movies via an API call
   * @param id 
   * @function removeFavoriteMovie
   */
  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

}