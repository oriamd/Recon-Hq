import {MessageActionTypes, MessageActions} from "@app/features/monitor/actions/message.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MessageState, TargetsState} from "@app/features/monitor/monitor.module";


const defaultState = {
  destReconunit: null,
  showMessageDialog: false,
  newMessage: "",
  showCreateNewMessageLoader: false
};

export function messageReducer(state = defaultState, action: MessageActions) {
  switch (action.type) {
    case MessageActionTypes.CreateNewMessage:
      return {...state, newMessage: action.payload};
    case MessageActionTypes.PostNewMessage:
      return {...state, newMessage: action.payload};
    case MessageActionTypes.ToggleMessageDialog:
      return {
        destReconunit: action.payload.destReconunit,
        showMessageDialog: action.payload.showMessageDialog,
        newMessage: state.newMessage,
        showCreateNewMessageLoader: state.showCreateNewMessageLoader
      };
    case MessageActionTypes.ToggleNewMessageLoader:
      return {...state, showCreateNewMessageLoader: action.payload};
    default:
        return state
  }

}

// create selector for the items
export const selectFeature = createFeatureSelector<MessageState>('messages');
export const selectDestReconunit = createSelector(selectFeature, (state) => state.destReconunit);
export const selectIsLadingCreateMessage = createSelector(selectFeature, (state) => state.showCreateNewMessageLoader);
export const selectShowMessageDialog = createSelector(selectFeature, (state) => {
  return {showMessageDialog: state.showMessageDialog, destReconunit: state.destReconunit};
});
