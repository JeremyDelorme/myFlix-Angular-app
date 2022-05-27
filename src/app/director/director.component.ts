/** 
 * The DirectorComponent is used to render a mat dialog containing information about the director of the movie selected.
 * @module DirectorComponent
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  /**
   * The data that was passed to the Director dialog in the MovieCardComponent is injected in to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birthday: Date,
    }
  ) { }

  ngOnInit(): void {
  }

}