import {Action} from '@ngrx/store'

export enum TargetActionTypes {
  LoadAllTargets = '[target] get',
  FetchAllTargetsFromService = '[target] fetch',
  LoadAllTargetsSuccess = '[target] Fetch success',
  UpdateAllTargets = '[target] Update targets',
  LoadAllTargetsError = '[target] Fetch error',
  ToggleTargetsLoader = '[target] Toggle Targets Loader'
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
    console.log(payload);
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


export type TargetActions
  = LoadAllTargets
  | FetchAllTargetsFromService
  | LoadAllTargetsSuccess
  | LoadAllTargetsSuccess
  | UpdateAllTargets
  | LoadAllTargetsError
  | ToggleTargetsLoader;
