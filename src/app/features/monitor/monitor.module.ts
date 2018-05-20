import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "@app/shared";
import { MonitorRoutingModule } from './monitor-routing.module';
import { DesktopComponent } from './components/desktop/desktop.component';
import {MenuComponent, MapComponent } from './components';
import {AgmCoreModule} from '@agm/core';
import {StoreModule} from "@ngrx/store";
import {targetReducer} from "@app/features/monitor/reducers/target.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TargetsEffects} from "@app/features/monitor/effects/targets.effects";

export interface TargetsState {
  targets:any[],
  showTargetsLoader: boolean
};

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2uR9sTGKgFo7pf-eRFK8Sexvz3rLaJcA'
    }),
    StoreModule.forRoot({'targets':targetReducer}),
    EffectsModule.forRoot([TargetsEffects])

  ],
  declarations: [DesktopComponent, MenuComponent, MapComponent]
})
export class MonitorModule { }
