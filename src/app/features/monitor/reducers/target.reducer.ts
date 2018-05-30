import {TargetActionTypes, TargetActions }from '../actions/target.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TargetsState} from "@app/features/monitor/monitor.module";


const defaultState = {
  targets : [],
  showTargetsLoader : false,
  showCreateNewTargetLoader: false
};

export function targetReducer(state = defaultState, action: TargetActions) {
  switch (action.type){
    case TargetActionTypes.UpdateAllTargets:
      return {...state, targets :action.payload};

    case TargetActionTypes.ToggleTargetsLoader:
      return {...state, showTargetsLoader : action.payload };

    case TargetActionTypes.CreateNewTarget:
      return {...state, newTarget : action.payload};

    case TargetActionTypes.ToggleCreateNewTargetLoader:
      return {...state, showCreateNewTargetLoader : action.payload };

    default :
        return state;
  }
}

// create selector for the items
export const selectFeature = createFeatureSelector<TargetsState>('targets');
export const selectAllTargets = createSelector(selectFeature, (state) => state.targets);
export const selectIsLadingTargets = createSelector(selectFeature, (state) => state.showTargetsLoader);
export const selectIsLadingCreateTarget = createSelector(selectFeature, (state) => state.showCreateNewTargetLoader);
