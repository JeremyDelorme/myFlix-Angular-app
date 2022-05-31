import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void { }

  /**
  * Navigates to movies page
  */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  /**
  * Navigates to profile page
  */
  toMyList(): void {
    this.router.navigate(['my-list']);
  }
  /**
   * Navigates to profile page
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }
  /**
   * Function to log out a user
   * Additional reroute to welcome page
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You are sigend out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}