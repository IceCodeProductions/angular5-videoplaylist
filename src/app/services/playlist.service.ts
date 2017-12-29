import { Injectable } from '@angular/core';

export interface playList {
  title: string;
  SRC: any;
  description: string;
}

@Injectable()
export abstract class PlaylistService {

  constructor() { }
  getPlayList: () => playList[];

}
