import {TargetActionTypes, TargetActions }from '../actions/target.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TargetsState} from "@app/features/monitor/monitor.module";


const defaultState = {
  targets : [],
  showTargetsLoader : false
};

export function targetReducer(state = defaultState, action: TargetActions) {
  switch (action.type){
    case TargetActionTypes.UpdateAllTargets:
      console.log(action.payload);
      return {...state, targets :action.payload};

    case TargetActionTypes.ToggleTargetsLoader:
      console.log("ToggleTargetsLoader");
      return {...state, showTargetsLoader : action.payload };

    default :
        return state;
  }
}

// create selector for the items
export const selectFeature = createFeatureSelector<TargetsState>('targets');
export const selectTargets = createSelector(selectFeature, (state) => state.targets);
export const selectIsLadingTargets = createSelector(selectFeature, (state) => state.showTargetsLoader);
