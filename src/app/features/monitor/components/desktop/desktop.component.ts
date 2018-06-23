import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {LiveVideoState, MessageState, TargetsState} from '@app/features/monitor/monitor.module';
import {Observable} from 'rxjs/Rx';
import * as TargetActions from '../../actions/target.actions'
import {selectShowMessageDialog} from "@app/features/monitor/reducers/message.reducer";
import {selectShowLiveVideo} from "@app/features/monitor/reducers/live-video.reducer";
import * as ReconUnitActions from "@app/features/monitor/actions/reconunit.actions";


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy {
  readonly PULLING_INTERVAL_TIME = 3000;
  targetPullerSubscription;
  reconunitPullerSubscription;
  showMessageDialog : boolean;
  destReconunit: any;
  showLiveVideo$: Observable<boolean>;


  constructor(private targetStore :Store<TargetsState>,private messageStore: Store<MessageState>, private liveVideoStore: Store<LiveVideoState>) {
    this.messageStore.select(selectShowMessageDialog).subscribe(value => {
      this.showMessageDialog = value.showMessageDialog;
      this.destReconunit = value.destReconunit;
    });

    this.showLiveVideo$ =  this.liveVideoStore.select(selectShowLiveVideo)
  }

  ngOnInit() {
   this.startPullingTargets();
   this.startPullingReconunits();
  }

  startPullingTargets(){
    this.targetPullerSubscription = Observable.interval(this.PULLING_INTERVAL_TIME).subscribe(()=>{
      this.targetStore.dispatch(new TargetActions.FetchAllTargetsFromService())
    })
  }

  stopPullingTargets(){
    this.targetPullerSubscription.unsubscribe();
  }

  startPullingReconunits(){
    this.reconunitPullerSubscription = Observable.interval(this.PULLING_INTERVAL_TIME).subscribe(()=>{
      this.targetStore.dispatch(new ReconUnitActions.LoadAllReconUnits())
    })
  }

  stopPullingReconunit(){
    this.reconunitPullerSubscription.unsubscribe();
  }


  ngOnDestroy(): void {
    this.stopPullingTargets();
    this.stopPullingReconunit();
  }



}
