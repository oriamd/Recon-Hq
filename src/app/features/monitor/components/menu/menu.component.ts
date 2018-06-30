import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TargetsState} from '@app/features/monitor/monitor.module';
import {Store} from '@ngrx/store';
import * as TargetActions from '../../actions/target.actions';
import * as ReconUnitActions from '../../actions/reconunit.actions';
import * as LiveVideoActions from '../../actions/live-video.actions';
import {selectIsLadingTargets, selectAllTargets} from '@app/features/monitor/reducers/target.reducer';
import {selectIsReconUnitsLoading, selectAllReconUnits} from '@app/features/monitor/reducers/reconunit.reducer';
import {MatDialog, MatTabChangeEvent} from '@angular/material';
import {NewTargetDialogComponent} from '@app/features/monitor/components/new-target-dialog/new-target-dialog.component';
import * as MessageActions from "@app/features/monitor/actions/message.actions";
import {Constants} from "@app/Constants";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  targets$: Observable<any>;
  isLoadingTarget$: Observable<any>;

  reconunits$: Observable<any>;
  isLoadingReconUnits$: Observable<any>;
  Constants: any;

  constructor(private store: Store<TargetsState>, public dialog: MatDialog) {
    this.targets$ = this.store.select(selectAllTargets);
    this.isLoadingTarget$ = this.store.select(selectIsLadingTargets);
    this.reconunits$ = this.store.select(selectAllReconUnits);
    this.isLoadingReconUnits$ = this.store.select(selectIsReconUnitsLoading);
    this.Constants = {
      reconUnits : Constants.reconUnits
    }
  }

  ngOnInit() {
    this.store.dispatch(new TargetActions.LoadAllTargets());
  }

  refreshTargets() {
    this.store.dispatch(new TargetActions.LoadAllTargets());
  }

  openNewTargetDialog() {
    let newTargetDialog = this.dialog.open(NewTargetDialogComponent, {
      panelClass: 'new-target-panel',
      disableClose: true
    });
  }

  openLiveVideo(event, reconunit) {
    event.stopPropagation();
    this.store.dispatch(new LiveVideoActions.ToggleLiveVideo(true, reconunit));
  }

  tabChanged($event: MatTabChangeEvent) {
    switch ($event.tab.textLabel) {
      case 'Recons':
        this.store.dispatch(new ReconUnitActions.LoadAllReconUnits());
    }
  }

  targetItemClicked(target){
    this.store.dispatch(new TargetActions.FocusTarget(target));
  }

  reconunitItemClicked(reconunit){
    if(!this.isClicableItem(reconunit)){
      return false
    }
    this.store.dispatch(new ReconUnitActions.FocusReconunit(reconunit));
  }

  openMessageDialog(event, reconunit){
    event.stopPropagation();
    this.store.dispatch(new MessageActions.ToggleMessageDialog(true,reconunit));
  }

  isClicableItem(item){
    return item.longitude != ''
      && item.longitude != null
      && item.latitude != ''
      && item.latitude != null
  }


}
