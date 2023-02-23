import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  getAboutMeInfo() {
    this.spotifyService.aboutMe().then((result) => {
      document.getElementById("username").innerText = "Logged in user: " + result.name;
      
      let image = document.getElementById("profileImage") as HTMLImageElement
      image.src =  result.imageURL;

      let button = document.getElementById("buttonToUser") as HTMLAnchorElement
      button.href =  result.spotifyProfile;
    })
  }
}
