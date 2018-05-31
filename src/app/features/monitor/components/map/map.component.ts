import {Component, OnInit} from '@angular/core';
import {MapTypeControlOptions} from "@agm/core/services/google-maps-types";
import {GoogleMapsAPIWrapper} from "@agm/core";
import {selectAllTargets} from "@app/features/monitor/reducers/target.reducer";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {TargetsState} from "@app/features/monitor/monitor.module";

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

  targets$: Observable<any>;

  constructor(googleMapsAPIWrapper: GoogleMapsAPIWrapper, private store: Store<TargetsState>) {
    this.targets$ = this.store.select(selectAllTargets);

    this.setAgmMapOptions()
  }

  ngOnInit() {
  }

  getTargetIconUrl(target){
    switch (target.type){
      case "target":
        return "../../../../../assets/target-icon-sm.png";
      case "ally":
        return "../../../../../assets/ally-icon-sm.png";
      case "warning":
        return "../../../../../assets/warning-icon-sm.png";
    }
  }

  setAgmMapOptions(){
    this.mapTypeControlOptions = {
      mapTypeIds: ['satellite', 'roadmap']
    };
  }

  convertToNumber(str){
    return +str;
  }

}
