import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessageState, TargetsState} from '@app/features/monitor/monitor.module';
import {Observable} from 'rxjs/Rx';
import * as TargetActions from '../../actions/target.actions'
import {selectShowMessageDialog} from "@app/features/monitor/reducers/message.reducer";


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy {
  readonly PULLING_INTERVAL_TIME = 3000;
  pullerSubscription;
  showMessageDialog : boolean;
  destReconunit: any;
  constructor(private targetStore :Store<TargetsState>,private messageStore: Store<MessageState>) {
    this.messageStore.select(selectShowMessageDialog).subscribe(value => {
      this.showMessageDialog = value.showMessageDialog;
      this.destReconunit = value.destReconunit;
    });
  }

  ngOnInit() {
   this.startPullingTargets();
  }

  startPullingTargets(){
    this.pullerSubscription = Observable.interval(this.PULLING_INTERVAL_TIME).subscribe(()=>{
      this.targetStore.dispatch(new TargetActions.FetchAllTargetsFromService())
    })
  }

  stopPullingTargets(){
    this.pullerSubscription.unsubscribe();
  }


  ngOnDestroy(): void {
    this.stopPullingTargets();
  }



}
