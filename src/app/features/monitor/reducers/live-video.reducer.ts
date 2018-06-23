import {LiveVideoActions, LiveVideoActionTypes} from "@app/features/monitor/actions/live-video.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LiveVideoState, MessageState} from "@app/features/monitor/monitor.module";


const defaultState ={
  reconunit: null,
  showLiveVideo: false,
  isLoadingLiveVideo: false
};

export function liveVideoReducer(state = defaultState, action: LiveVideoActions) {
 switch (action.type){
   case LiveVideoActionTypes.ToggleLiveVideo:
     return {...state,  showLiveVideo: action.payload.showLiveVideo,reconunit: action.payload.reconunit }
   default:
     return state;
 }
}

// create selector for the items
export const selectFeature = createFeatureSelector<LiveVideoState>('liveVideo');
export const selectReconunit = createSelector(selectFeature, (state) => state.reconunit);
export const selectShowLiveVideo = createSelector(selectFeature, (state) => state.showLiveVideo);
