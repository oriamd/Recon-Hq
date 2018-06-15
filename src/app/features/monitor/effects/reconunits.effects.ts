import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';
import {
  LoadAllReconUnits,
  FetchAllReconUnitsFromService,
  LoadAllReconUnitsSuccess,
  LoadAllReconUnitsError,
  ToggleLoadAllReconUnitsLoader,
  UpdateAllReconUnits,
  ReconUnitActionTypes,
  ReconUnitActions
} from '../actions/reconunit.actions'
import {ReconUnitService} from '@app/core/reconUnit/recon-unit.service';

@Injectable()
export class ReconUnitEffects {
  constructor(private actions: Actions,private reconUnitsService: ReconUnitService) {
  }

  @Effect()
  getReconunits = this.actions
    .ofType(ReconUnitActionTypes.LoadAllReconUnits)
    .flatMap(()=>[
      new ToggleLoadAllReconUnitsLoader(true),
      new FetchAllReconUnitsFromService()
    ]);

  @Effect()
  fetchReconUnits = this.actions
    .ofType(ReconUnitActionTypes.FetchAllReconUnitsFromService)
    .mergeMap( ()=>this.reconUnitsService.getAllReconUnits()
      .map((result)=>{
        if (result.success)
          return new LoadAllReconUnitsSuccess(result.data);
        else {
          throw result.error;
        }
      })
      .catch(error => of(new LoadAllReconUnitsError(error)))
    );

  @Effect()
  loadReconUnitsSuccess = this.actions
    .ofType(ReconUnitActionTypes.LoadAllReconUnitsSuccess)
    .flatMap((action : ReconUnitActions)=>[
      new ToggleLoadAllReconUnitsLoader(false),
      new UpdateAllReconUnits(action.payload)
    ]);

  @Effect()
  loadReconUnitsError = this.actions
    .ofType(ReconUnitActionTypes.LoadAllReconUnitsError)
    .flatMap((action)=>[
      new ToggleLoadAllReconUnitsLoader(false)
    ])

}
