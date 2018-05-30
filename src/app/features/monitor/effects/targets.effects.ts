import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';
import {TargetService} from '@app/core/target/target.service';
import {
  CreateNewTargetError,
  CreateNewTargetSuccess,
  FetchAllTargetsFromService, PostNewTarget,
  TargetActions,
  TargetActionTypes, ToggleCreateNewTargetLoader,
  ToggleTargetsLoader
} from '../actions/target.actions';
import {
  LoadAllTargetsError,
  LoadAllTargetsSuccess,
  UpdateAllTargets
} from '@app/features/monitor/actions/target.actions';

@Injectable()
export class TargetsEffects {

  constructor(private actions: Actions, private targetService: TargetService) {
  }

  @Effect()
  getTargets = this.actions
    .ofType(TargetActionTypes.LoadAllTargets)
    .flatMap(() => [
      new ToggleTargetsLoader(true),
      new FetchAllTargetsFromService()
    ]);

  @Effect()
  fetchAllTargets = this.actions
    .ofType(TargetActionTypes.FetchAllTargetsFromService)
    .mergeMap(() => this.targetService.getAllTargets()
      .map(result => {
        if (result.success)
          return new LoadAllTargetsSuccess(result.data);
        else {
          throw result.error;
        }
      })
      .catch(error => of(new LoadAllTargetsError(error)))
    );

  @Effect()
  showLoader = this.actions
    .ofType(TargetActionTypes.LoadAllTargetsSuccess)
    .flatMap((action: TargetActions) => {
      return [
        new UpdateAllTargets(action.payload),
        new ToggleTargetsLoader(false),
      ];
    });

  @Effect()
  hideLoader = this.actions
    .ofType(TargetActionTypes.LoadAllTargetsError)
    .flatMap((action) => {
      return [new ToggleTargetsLoader(false)];
    });

  @Effect()
  createTarget = this.actions
    .ofType(TargetActionTypes.CreateNewTarget)
    .flatMap((action : TargetActions)=>[
      new ToggleCreateNewTargetLoader(true),
      new PostNewTarget(action.payload)
    ]);

  @Effect()
  postTarget = this.actions
    .ofType(TargetActionTypes.PostNewTarget)
    .mergeMap((action: TargetActions) =>
      this.targetService.postTarget(action.payload)
        .map(result => {
          if (result.success)
            return new CreateNewTargetSuccess(result.data);
          else {
            throw result.error;
          }
        })
        .catch(error => of(new CreateNewTargetError(error)))
    );


  @Effect()
  CreateNewTargetSuccess = this.actions
    .ofType(TargetActionTypes.CreateNewTargetSuccess)
    .flatMap((action) => {
      return [
        new ToggleCreateNewTargetLoader(false),
        new FetchAllTargetsFromService()
      ];
    });

  @Effect()
  CreateNewTargetError = this.actions
    .ofType(TargetActionTypes.CreateNewTargetSuccess)
    .flatMap((action) => {
      return [new ToggleCreateNewTargetLoader(false)];
    });

}
