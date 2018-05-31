import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TargetsState} from "@app/features/monitor/monitor.module";
import {Store} from "@ngrx/store";
import * as TargetActions from '../../actions/target.actions'
import {selectIsLadingTargets, selectAllTargets} from "@app/features/monitor/reducers/target.reducer";
import {MatDialog} from '@angular/material';
import {NewTargetDialogComponent} from '@app/features/monitor/components/new-target-dialog/new-target-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  targets$: Observable<any>;
  isLoadingTarget$: Observable<any>;

  constructor(private store :Store<TargetsState>, public dialog: MatDialog) {
    this.targets$ = this.store.select(selectAllTargets);
    this.isLoadingTarget$ = this.store.select(selectIsLadingTargets);
  }

  ngOnInit() {
  }

  refreshTargets() {
    this.store.dispatch(new TargetActions.LoadAllTargets());
  }

  openNewTargetDialog(){
    let newTargetDialog = this.dialog.open(NewTargetDialogComponent, {
      panelClass: 'new-target-panel',
      disableClose: true
    });
  }

}
