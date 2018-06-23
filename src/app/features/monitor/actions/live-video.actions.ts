import {Action} from '@ngrx/store';

export enum LiveVideoActionTypes {
  ToggleLiveVideo = '[liveVideo] Toggle Live Video'
}

export class ToggleLiveVideo implements Action{
  public type: string;
  public payload: any;
  constructor(showLiveVideo: boolean, reconunit: any) {
    this.type = LiveVideoActionTypes.ToggleLiveVideo;
    this.payload = {
      showLiveVideo: showLiveVideo,
      reconunit: reconunit
    };
  }
}

export type LiveVideoActions = ToggleLiveVideo;
