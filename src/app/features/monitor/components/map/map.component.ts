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

  setAgmMapOptions(){
    this.mapTypeControlOptions = {
      mapTypeIds: ['roadmap', 'satellite']
    };
  }

  convertToNumber(str){
    return +str;
  }

}
