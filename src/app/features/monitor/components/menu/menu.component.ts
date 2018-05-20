import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TargetsState} from "@app/features/monitor/monitor.module";
import {Store} from "@ngrx/store";
import * as TargetActions from '../../actions/target.actions'
import {selectIsLadingTargets, selectTargets} from "@app/features/monitor/reducers/target.reducer";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  targets$: Observable<any>;
  isLoadingTarget$: Observable<any>;

  constructor(private store :Store<TargetsState>) {
    this.targets$ = this.store.select(selectTargets);
    this.isLoadingTarget$ = this.store.select(selectIsLadingTargets);
  }

  ngOnInit() {
  }

  refreshTargets() {
    console.log('refreshTargets');
    this.store.dispatch(new TargetActions.LoadAllTargets());
  }

}
