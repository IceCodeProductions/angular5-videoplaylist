import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VideoPlayerComponent } from './videoplayer.component';
import { VideoService } from '../services/video.service';
import 'rxjs/Rx';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    VideoPlayerComponent, 
    FilterPipe    
  ],
  imports: [HttpClientModule, HttpClientJsonpModule, BrowserModule, BrowserAnimationsModule
  ],
  providers: [VideoService
  ],
  bootstrap: [VideoPlayerComponent]
})
export class AppModule { }
