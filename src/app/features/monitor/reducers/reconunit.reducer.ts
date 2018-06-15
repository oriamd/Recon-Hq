import {ReconUnitActionTypes, ReconUnitActions }from '../actions/reconunit.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ReconUnitsState} from "@app/features/monitor/monitor.module";


const defaultState = {
  reconunits : [],
  showReconunitsLoader : false
};

export function reconUnitReducer(state = defaultState, action: ReconUnitActions) {
  switch (action.type){
    case ReconUnitActionTypes.UpdateAllReconUnits:
      return {...state, reconunits :action.payload};

    case ReconUnitActionTypes.ToggleLoadAllReconUnitsLoader:
      return {...state, showReconunitsLoader : action.payload };

    default :
      return state;
  }
}

// create selector for the items
export const selectFeature = createFeatureSelector<ReconUnitsState>('reconunits');
export const selectAllReconUnits = createSelector(selectFeature, (state) => state.reconunits);
export const selectIsReconUnitsLoading = createSelector(selectFeature, (state) => state.showReconunitsLoader);
