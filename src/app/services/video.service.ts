import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


interface PlayList {
  title: string;
  description: string;
  embed: any;
  active: any;
}


@Injectable()
export class VideoService {

  private playListUrl = "./assets/data/video.json";
  public iframeElement: any;
  public videoSRC: SafeUrl = "";
  public videoTitle: string = "";
  public videoDescription: string = "";
  public playList: Array<PlayList> = [];
  public videoEmbed: any = "";
   
  
  constructor(public sanitizer: DomSanitizer, private http: HttpClient) { }

  appSetup(v: string) {
    this.iframeElement = <HTMLIFrameElement>document.getElementById(v);
    //the line listed below must be in otherwise, the system will return an error about not having a safe
    //url.
    this.videoSRC = this.sanitizer.bypassSecurityTrustResourceUrl("");
  }


  gatherJSON() {
    //this will read the video.json file stored in the assets folder
    this.http.get<PlayList[]>(this.playListUrl)
      .subscribe(data => {
        this.playList = data;
        this.selectVideo(0);
      });
  }

  selectVideo = (i: number) => {
    //pass in the index number of the playlist to play next.  Numbers start at 0 and up.
    this.videoTitle = this.playList[i]['title'];
    this.videoDescription = this.playList[i]["description"];
    this.videoSRC = this.sanitizer.bypassSecurityTrustResourceUrl(this.getSrcUrlFromEmbed(this.playList[i]["embed"]));
    this.hideIcons();
    this.playList[i]['active'] = 'show-icon';
  }

  hideIcons() {
    var z = this.playList.length;
    var i;
    for (i = 0, z; i < z; i++) {
      this.playList[i]['active'] = 'hide-icon';
    }
    
  }


  getSrcUrlFromEmbed(v: string) {
    //this function returns the src value from the iframe embed code.  All iframes must have an embed code.  The iframe embed
    //is saved in escaped form in the json file or json data.  Slido is a sample of one company that for some reasons uses
    //a single quote around the src, while everyone else is using the double quote.
    var srcloc = v.indexOf("src=");
    var qtype;
    var endqpos;
    if (srcloc == -1) {
      return "";
    } else {
      qtype = v.substr(srcloc + 4, 1);
      //get the last position of the closing qoute found in qtype
      var i = srcloc + 5;
      var done = false;
      while (done === false) {
        if (v.charAt(i) == qtype) {
          done = true;
          break;
        }
        i++;
      }
      return (v.substr(srcloc + 5, i - srcloc - 5));
    }
  }

 
}
