import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TargetsState} from '@app/features/monitor/monitor.module';
import {Observable} from 'rxjs/Rx';
import * as TargetActions from '../../actions/target.actions'


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy {
  readonly PULLING_INTERVAL_TIME = 3000;
  pullerSubscription;

  constructor(private store :Store<TargetsState>) {
  }

  ngOnInit() {
   this.startPullingTargets();
  }

  startPullingTargets(){
    this.pullerSubscription = Observable.interval(this.PULLING_INTERVAL_TIME).subscribe(()=>{
      this.store.dispatch(new TargetActions.FetchAllTargetsFromService())
    })
  }

  stopPullingTargets(){
    this.pullerSubscription.unsubscribe();
  }


  ngOnDestroy(): void {
    this.stopPullingTargets();
  }



}
