import {Action} from '@ngrx/store';

export enum TargetActionTypes {
  LoadAllTargets = '[target] get',
  FetchAllTargetsFromService = '[target] fetch',
  LoadAllTargetsSuccess = '[target] Fetch success',
  UpdateAllTargets = '[target] Update targets',
  LoadAllTargetsError = '[target] Fetch error',
  ToggleTargetsLoader = '[target] Toggle Targets Loader',
  CreateNewTarget = '[target] CreateNewTarget',
  PostNewTarget = '[target] PostNewTarget',
  CreateNewTargetSuccess = '[target] CreateNewTargetSuccess',
  CreateNewTargetError = '[target] CreateNewTargetError',
  ToggleCreateNewTargetLoader = '[target] ToggleCreateNewTargetLoader',
  FocusTarget = '[target] FocusTarget'
}

export class LoadAllTargets implements Action {
  public type: string;
  public payload: any;
  constructor() {
    this.type = TargetActionTypes.LoadAllTargets;
    this.payload = null;
  }
}

export class FetchAllTargetsFromService implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = TargetActionTypes.FetchAllTargetsFromService;
    this.payload = null;
  }
}

export class UpdateAllTargets implements Action {
  type: string;
  payload: any[];

  constructor(payload: any[]) {
    this.type = TargetActionTypes.UpdateAllTargets;
    this.payload = payload;
  }
}

export class LoadAllTargetsSuccess implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.LoadAllTargetsSuccess;
    this.payload = payload;
  }
}

export class ToggleTargetsLoader implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.ToggleTargetsLoader;
    this.payload = payload;
  }
}

export class LoadAllTargetsError implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.LoadAllTargetsError;
    this.payload = payload;
  }
}

export class CreateNewTarget implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.CreateNewTarget;
    this.payload = payload;
  }
}

export class PostNewTarget implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.PostNewTarget;
    this.payload = payload;
  }
}

export class CreateNewTargetSuccess implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.CreateNewTargetSuccess;
    this.payload = payload;
  }
}

export class CreateNewTargetError implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.CreateNewTargetError;
    this.payload = payload;
  }
}

export class ToggleCreateNewTargetLoader implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.ToggleCreateNewTargetLoader;
    this.payload = payload;
  }
}

export class FocusTarget implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = TargetActionTypes.FocusTarget;
    this.payload = payload;
  }
}

export type TargetActions
  = LoadAllTargets
  | FetchAllTargetsFromService
  | LoadAllTargetsSuccess
  | LoadAllTargetsSuccess
  | UpdateAllTargets
  | LoadAllTargetsError
  | ToggleTargetsLoader
  | FocusTarget;
