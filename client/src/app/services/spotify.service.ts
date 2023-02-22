import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    const url = this.expressBaseUrl + endpoint;
    return this.http.get(url).toPromise();
  }

  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me')
      .then((data) => {
        let n = new ProfileData(data)
        return n;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    return this.sendRequestToExpress('/search' + "/" +category+ "/" + encodeURIComponent(resource))
    .then((data) => {
      if (category === 'artist') {
        return data.artists.items.map((artist: any) => new ArtistData(artist));
      } else if (category === 'album') {
        return data.albums.items.map((album: any) => new AlbumData(album));
      } else if (category === 'track') {
        return data.tracks.items.map((track: any) => new TrackData(track));
      } else {
        throw new Error(`Invalid category: ${category}`);
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      throw error;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.;
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId))
      .then((data) => {
        let n = new ArtistData(data)
        return n;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    // TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress('/artist-related-artists/' + artistId)
      .then((data) => {
        console.log(data);
        return data.artists.map((related: any) => new ArtistData(related));
      })
      .catch((error) => {
        console.error('An error occurred yo:', error);
        throw error;
      });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/' + artistId)
    .then((data) => {
      return data.tracks.map((track: any) => new TrackData(track));
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      throw error;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/' + artistId)
    .then((data) => {
      return data.items.map((album: any) => new AlbumData(album));
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      throw error;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/' + albumId)
      .then((data) => {
        let n = new AlbumData(data)
        return n;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/' + albumId)
      .then((data) => {
        return data.items
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null as any;
  }
}
