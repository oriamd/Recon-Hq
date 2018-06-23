import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveVideoState} from "@app/features/monitor/monitor.module";
import {Store} from '@ngrx/store';
import {selectReconunit} from "@app/features/monitor/reducers/live-video.reducer";
import * as LiveVideoActions from '../../actions/live-video.actions';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.css']
})
export class LiveVideoComponent implements OnInit {
  @ViewChild('newMessageForm') public videoElement;
  videoSrc : String ;
  reconunit: any;
  isLiveVideoAvailable: boolean;

  constructor(private store: Store<LiveVideoState>) {
    this.store.select(selectReconunit).subscribe(value => {
      this.reconunit = value;
      if(this.reconunit.ip != null && this.reconunit.connectionusername != null && this.reconunit.connectionpassword != null){
        this.setVideoSrc(this.reconunit.ip, this.reconunit.connectionusername, this.reconunit.connectionpassword)
        this.isLiveVideoAvailable = true;
      }else{
        this.isLiveVideoAvailable = false;
      }
    });
  }

  setVideoSrc(ip: String, username: String, password: String){
    this.videoSrc = `https://${username}:${password}@${ip}/api/holographic/stream/live_high.mp4?holo=true&pv=true&mic=true&loopback=true`
  }

  close(){
    this.store.dispatch(new LiveVideoActions.ToggleLiveVideo(false,null))
  }

  ngOnInit() {
    if(this.videoElement){
      this.videoElement.play()
    }
  }

}
