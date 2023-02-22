import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    // this.artistId = this.route.snapshot.paramMap.get('id');

    this.spotifyService.getArtist(this.artistId).then((result) => {
      // console.log(result)
      this.artist = result
    }).catch((error: any) => {
      console.error(error);
    });

    this.spotifyService.getRelatedArtists(this.artistId).then((result) => {

      this.relatedArtists = result
    }).catch((error: any) => {
      console.error(error);
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((result) => {
      this.topTracks = result
    }).catch((error: any) => {
      console.error(error);
    });


    this.spotifyService.getAlbumsForArtist(this.artistId).then((result) => {
      console.log(result)
      this.albums = result
    }).catch((error: any) => {
      console.error(error);
    });
  }

}