import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';
import { fetchApiData } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: fetchApiData,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * function transfering the user data input to the server-side storage (database)
   * @function userLogin
   * @param userCredentials
   * @return user data in JSON format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      localStorage.setItem("user", response.user.Username);
      localStorage.setItem("token", response.token);
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open("user logged in", "OK", {
        duration: 2000
      });
      this.router.navigate(["movies"]); //when user login successfully, navigate to the movielist
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, "OK", {
        duration: 2000
      });
    });
  }

}