import {ReconUnitActionTypes, ReconUnitActions }from '../actions/reconunit.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ReconUnitsState} from "@app/features/monitor/monitor.module";


const defaultState = {
  reconunits : [],
  showReconunitsLoader : false,
  focusedReconunit : null
};

export function reconUnitReducer(state = defaultState, action: ReconUnitActions) {
  switch (action.type){
     case ReconUnitActionTypes.UpdateAllReconUnits:

      let payloadReconunit = action.payload,
        reconunitIndex = undefined,
        stateReconunits = state.reconunits,
        indexsToRemove = [];
      //Adding new Reconunits
      for (let i=0; i<payloadReconunit.length; i++) {
        reconunitIndex = stateReconunits.find(reconunit => reconunit.id == payloadReconunit[i].id);
        if(reconunitIndex == null){
          stateReconunits.push(payloadReconunit[i]);
        }else{
          if(payloadReconunit[i].latitude != reconunitIndex.latitude || payloadReconunit[i].longitude != reconunitIndex.longitude){
            reconunitIndex.latitude = payloadReconunit[i].latitude ;
            reconunitIndex.longitude = payloadReconunit[i].longitude;
          }
        }
      }
      //Removing reconunit
      for (let i=0; i<stateReconunits.length; i++) {
        reconunitIndex = payloadReconunit.find(reconunit => reconunit.id == stateReconunits[i].id);
        if(reconunitIndex == null){
          indexsToRemove.push(i);
        }
      }
      for (let index of indexsToRemove){
        stateReconunits.splice(index,1);
      }
      // return {...state, reconunits :action.payload};

    case ReconUnitActionTypes.ToggleLoadAllReconUnitsLoader:
      return {...state, showReconunitsLoader : action.payload };

    case ReconUnitActionTypes.FocusReconunit:
      return {...state, focusedReconunit : Object.assign({}, action.payload)};

    default :
      return state;
  }
}

// create selector for the items
export const selectFeature = createFeatureSelector<ReconUnitsState>('reconunits');
export const selectAllReconUnits = createSelector(selectFeature, (state) => state.reconunits);
export const selectIsReconUnitsLoading = createSelector(selectFeature, (state) => state.showReconunitsLoader);
export const selectFocusedReonunit = createSelector(selectFeature, (state) => state.focusedReconunit);
