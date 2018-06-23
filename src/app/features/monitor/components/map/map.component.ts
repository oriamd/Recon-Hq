import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapTypeControlOptions} from '@agm/core/services/google-maps-types';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {selectAllTargets, selectFocusedTarget} from '@app/features/monitor/reducers/target.reducer';
import {selectAllReconUnits, selectFocusedReonunit} from '@app/features/monitor/reducers/reconunit.reducer';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {TargetsState} from '@app/features/monitor/monitor.module';
import {NewTargetDialogComponent} from '@app/features/monitor/components/new-target-dialog/new-target-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit {
  startupLocation = {
    lat: 32.101618,
    lng: 34.811356
  };
  mapTypeControlOptions: MapTypeControlOptions;
  map: any;

  focusedTarget$: Observable<any>;
  focusedTargetId: number;
  targets: any;
  reconunits: any;
  focusedReconunit$: Observable<any>;
  focusedReconunitId: number;

  constructor(private googleMapsAPIWrapper: GoogleMapsAPIWrapper, private store: Store<TargetsState>, public dialog: MatDialog) {
    this.store.select(selectAllTargets).subscribe(value => {
      this.targets = value;
    });
    this.store.select(selectAllReconUnits).subscribe(value => {
      this.reconunits = value;
    });
    this.focusedTarget$ = this.store.select(selectFocusedTarget);
    this.focusedReconunit$ = this.store.select(selectFocusedReonunit);


    this.setAgmMapOptions();
  }

  ngOnInit() {
  }

  mapReady(map) {
    this.map = map;

    this.focusedTarget$.subscribe(value => {
      if (value != null && this.map != null) {
        let coords = {
          lat: parseFloat(value.latitude),
          lng: parseFloat(value.longitude)
        };
        this.map.setCenter(coords);
        this.focusedTargetId = value.id;
        this.focusedReconunitId = -1;
      }
    });

    this.focusedReconunit$.subscribe(value => {
      if (value != null && this.map != null) {
        let coords = {
          lat: parseFloat(value.latitude),
          lng: parseFloat(value.longitude)
        };
        this.map.setCenter(coords);
        this.focusedReconunitId = value.id;
        this.focusedTargetId = -1;
      }
    });
  }

  getTargetIconUrl(target) {
    switch (target.type) {
      case 'target':
        return '../../../../../assets/target-icon-sm.png';
      case 'ally':
        return '../../../../../assets/ally-icon-sm.png';
      case 'warning':
        return '../../../../../assets/warning-icon-sm.png';
    }
  }

  setAgmMapOptions() {
    this.mapTypeControlOptions = {
      mapTypeIds: ['satellite', 'roadmap']
    };
  }

  convertToNumber(str) {
    return +str;
  }

  markerClick(target){
    this.focusedTargetId = this.targets.id;
  }

  onMapClick($event) {
    let newTargetDialog = this.dialog.open(NewTargetDialogComponent, {
      panelClass: 'new-target-panel',
      disableClose: true,
      data: $event
    });
  }

}
