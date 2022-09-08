import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-jeremydelorme.herokuapp.com/';
// //get token from localStorage
// const token = localStorage.getItem('token');
// //get username from localStorage
// const username = localStorage.getItem('username');
@Injectable({
  providedIn: 'root'
})

export class fetchApiData {
  constructor(private http: HttpClient) { }

  /**
   * calls API endpoint to register a new user
   * @param userDetails 
   * @returns a new user object in JSON format
   */
  //Registration Endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to login an existing user
 * @param userDetails 
 * @returns data of the user in JSON format
 */
  // Login Endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to get data on all movies
 * @returns array of all movies in JSON format
 */
  // Get List Of All Movies Endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to get data on a single movie specified by its title
 * @param title 
 * @returns JSON object holding movie data
 */
  // Get A Single Movie Endpoint
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to get data on a director
 * @param name 
 * @returns JSON obejct holding director data
 */
  // Get Director Details Endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to get data on a genre
 * @param name 
 * @returns JSON object holding genre data
 */
  // Get Genre Details Endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to get data on a single user
 * @returns JSON object holding data about the requested user
 */
  // Get Profile Details Endpoint
  getUserProfile(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
* calls API endpoint to get list of favorite movies of this user
* @returns list of the user's favorite movies in JSON format
*/
  // Get Favorite Movies Endpoint
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID 
   * @returns JSON object holding data about the updated user
   */

  // Add A Movie To The List Of Favorites Endpoint
  addToFavoriteMovies(movieID: string): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const user = localStorage.getItem('user');
    return this.http
      .patch(apiUrl + `users/${user}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * calls API endpoint to delete a movie from the user's list of favorite movies
 * @param movieID 
 * @returns JSON object holding data about the updated user
 */
  // Delete A Movie From The List Of Favorites Endpoint
  deleteFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to allow user to update their user information
 * @param updateDetails 
 * @returns JSON object holding data about the updated user
 */
  // Update Profile Details Endpoint
  editUserProfile(updateDetails: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * calls API endpoint to deregister an existing user
 * @returns	A success message indicating that the profile was successfully deleted.
 */
  // Delete Profile Endpoint
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * extracts response data from HTTP response
 * @param data 
 * @returns response body or empty object
 */
  // Response Of Data Extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  /**
 * handles errors
 * @param error 
 * @returns error message
 */
  // Error-Handling Function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something went wrong; please try again later.');
  }
}