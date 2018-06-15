import {Action} from '@ngrx/store';

export enum ReconUnitActionTypes {
  LoadAllReconUnits = '[reconunit] get',
  FetchAllReconUnitsFromService = '[reconunit] fetch',
  UpdateAllReconUnits = '[reconunit] Update targets',
  LoadAllReconUnitsError = '[reconunit] Fetch error',
  LoadAllReconUnitsSuccess = '[reconunit] Load Success',
  ToggleLoadAllReconUnitsLoader = '[reconunit] Toggle Targets Loader',
}

export class LoadAllReconUnits implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = ReconUnitActionTypes.LoadAllReconUnits;
    this.payload = null;
  }
}

export class FetchAllReconUnitsFromService implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = ReconUnitActionTypes.FetchAllReconUnitsFromService;
    this.payload = null;
  }
}

export class UpdateAllReconUnits implements Action {
  type: string;
  payload: any[];

  constructor(payload: any[]) {
    console.log(payload);
    this.type = ReconUnitActionTypes.UpdateAllReconUnits;
    this.payload = payload;
  }
}

export class LoadAllReconUnitsSuccess implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = ReconUnitActionTypes.LoadAllReconUnitsSuccess;
    this.payload = payload;
  }
}

export class ToggleLoadAllReconUnitsLoader implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = ReconUnitActionTypes.ToggleLoadAllReconUnitsLoader;
    this.payload = payload;
  }
}

export class LoadAllReconUnitsError implements Action {
  public type: string;
  public payload: any;

  constructor(payload: any) {
    this.type = ReconUnitActionTypes.LoadAllReconUnitsError;
    this.payload = payload;
  }
}

export type ReconUnitActions
  = LoadAllReconUnits
  | FetchAllReconUnitsFromService
  | UpdateAllReconUnits
  | LoadAllReconUnitsError
  | LoadAllReconUnitsSuccess;
