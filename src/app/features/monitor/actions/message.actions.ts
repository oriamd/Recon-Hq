import {Action} from '@ngrx/store';

export enum MessageActionTypes {
  ToggleMessageDialog = '[message] ToggleMessageDialog',
  CreateNewMessage = '[message] CreateNewMessage',
  CreateNewMessageSuccess = '[message] CreateNewMessageSuccess',
  CreateNewMessageError = '[message] CreateNewMessageError',
  PostNewMessage = '[message] PostNewMessage',
  ToggleNewMessageLoader = '[message] ToggleNewMessageLoader',
}

export class CreateNewMessage implements Action{
  public type: string;
  public payload: any;
  constructor(payload: any) {
    this.type = MessageActionTypes.CreateNewMessage;
    this.payload = payload;
  }
}

export class PostNewMessage implements Action{
  public type: string;
  public payload: any;
  constructor(payload: any) {
    this.type = MessageActionTypes.PostNewMessage;
    this.payload = payload;
  }
}

export class ToggleMessageDialog implements Action{
  public type: string;
  public payload: any;
  constructor(showMessageDialog: boolean, destReconunit: any) {
    this.type = MessageActionTypes.ToggleMessageDialog;
    this.payload = {
      showMessageDialog : showMessageDialog,
      destReconunit : destReconunit
    };
  }
}

export class ToggleNewMessageLoader implements Action{
  public type: string;
  public payload: any;
  constructor(payload: any) {
    this.type = MessageActionTypes.ToggleNewMessageLoader;
    this.payload = payload;
  }
}

export class CreateNewMessageSuccess implements Action{
  public type: string;
  public payload: any;
  constructor() {
    this.type = MessageActionTypes.CreateNewMessageSuccess;
    this.payload = null;
  }
}

export class CreateNewMessageError implements Action{
  public type: string;
  public payload: any;
  constructor() {
    this.type = MessageActionTypes.CreateNewMessageError ;
    this.payload = null;
  }
}

export type MessageActions
  = ToggleNewMessageLoader
  | ToggleMessageDialog
  | PostNewMessage
  | CreateNewMessage
  | CreateNewMessageSuccess
  | CreateNewMessageError;
