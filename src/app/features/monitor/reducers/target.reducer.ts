import {TargetActionTypes, TargetActions} from '../actions/target.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TargetsState} from "@app/features/monitor/monitor.module";
import {$} from 'protractor';


const defaultState = {
  targets: [],
  showTargetsLoader: false,
  showCreateNewTargetLoader: false,
  focusedTarget: null
};

export function targetReducer(state = defaultState, action: TargetActions) {
  switch (action.type) {
    case TargetActionTypes.UpdateAllTargets:
      let payloadTargets = action.payload,
        targetIndex = undefined,
        stateTargets = state.targets,
        indexsToRemove = [];
      //Adding new Target
      for (let i=0; i<payloadTargets.length; i++) {
        targetIndex = stateTargets.find(target => target.id == payloadTargets[i].id);
        if(targetIndex == null){
          stateTargets.push(payloadTargets[i]);
        }
      }
      //Removing Targets
      for (let i=0; i<stateTargets.length; i++) {
        targetIndex = payloadTargets.find(target => target.id == stateTargets[i].id);
        if(targetIndex == null){
          indexsToRemove.push(i);
        }
      }
      for (let index of indexsToRemove){
        stateTargets.splice(index,1);
      }
      return state;

    case TargetActionTypes.ToggleTargetsLoader:
      return {...state, showTargetsLoader: action.payload};

    case TargetActionTypes.CreateNewTarget:
      return {...state, newTarget: action.payload};

    case TargetActionTypes.ToggleCreateNewTargetLoader:
      return {...state, showCreateNewTargetLoader: action.payload};
    case TargetActionTypes.FocusTarget:
      //Need to copy the enumerable so subscribers wil get notify when selecting same target twice in a row
      return {...state, focusedTarget: Object.assign({}, action.payload)};

    default :
      return state;
  }
}

// create selector for the items
export const selectFeature = createFeatureSelector<TargetsState>('targets');
export const selectAllTargets = createSelector(selectFeature, (state) => state.targets);
export const selectIsLadingTargets = createSelector(selectFeature, (state) => state.showTargetsLoader);
export const selectIsLadingCreateTarget = createSelector(selectFeature, (state) => state.showCreateNewTargetLoader);
export const selectFocusedTarget = createSelector(selectFeature, (state) => state.focusedTarget);
