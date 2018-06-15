import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared";
import { MonitorRoutingModule } from './monitor-routing.module';
import {MenuComponent, MapComponent, MessageDialogComponent, DesktopComponent, NewTargetDialogComponent } from './components';
import {AgmCoreModule} from '@agm/core';
import {StoreModule} from "@ngrx/store";
import {targetReducer} from "@app/features/monitor/reducers/target.reducer";
import {reconUnitReducer} from "@app/features/monitor/reducers/reconunit.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TargetsEffects} from "@app/features/monitor/effects/targets.effects";
import {ReconUnitEffects} from '@app/features/monitor/effects/reconunits.effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {messageReducer} from "@app/features/monitor/reducers/message.reducer";
import {MessageEffect} from "@app/features/monitor/effects/message.effect";
import { LiveVideoComponent } from './componenets/live-video/live-video.component';

export interface TargetsState {
  targets:any[],
  showTargetsLoader: boolean
  newTarget: any,
  showCreateNewTargetLoader: boolean,
  focusedTarget: any
}

export interface ReconUnitsState {
  reconunits:any[],
  showReconunitsLoader: boolean
}

export interface MessageState {
  destReconunit:any,
  showMessageDialog: boolean,
  newMessage: String
  showCreateNewMessageLoader: boolean,
}

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2uR9sTGKgFo7pf-eRFK8Sexvz3rLaJcA'
    }),
    StoreModule.forRoot({'targets':targetReducer,'reconunits':reconUnitReducer, 'messages' : messageReducer}),
    EffectsModule.forRoot([TargetsEffects, ReconUnitEffects, MessageEffect]),
    StoreDevtoolsModule.instrument()

  ],
  declarations: [DesktopComponent, MenuComponent, MapComponent, NewTargetDialogComponent, MessageDialogComponent, LiveVideoComponent],
  entryComponents: [NewTargetDialogComponent]
})
export class MonitorModule { }
