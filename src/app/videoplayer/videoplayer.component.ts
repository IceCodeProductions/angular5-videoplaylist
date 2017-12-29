import { Component, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition ,keyframes} from '@angular/animations';
import { VideoService } from '../services/video.service';


@Component({
  selector: 'video-player',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        display:"block",
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
        display:"none"
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})

export class VideoPlayerComponent implements  OnInit {
  
  show: boolean = false;

  constructor(public videoService: VideoService) { }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.videoService.appSetup("videoDisplay");
    this.videoService.gatherJSON();
  }
  

}

