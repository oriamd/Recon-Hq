import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';
import {TargetService} from "@app/core/target/target.service";
import {
  FetchAllTargetsFromService,
  TargetActions,
  TargetActionTypes,
  ToggleTargetsLoader
} from '../actions/target.actions';
import {
  LoadAllTargetsError,
  LoadAllTargetsSuccess,
  UpdateAllTargets
} from "@app/features/monitor/actions/target.actions";

@Injectable()
export class TargetsEffects{

  constructor(private actions: Actions,private targetService : TargetService) {}

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
      .map(result => (new LoadAllTargetsSuccess(result.data)))
      .catch(error => of(new LoadAllTargetsError(error)))
    );

  @Effect()
  updateBooks = this.actions
    .ofType(TargetActionTypes.LoadAllTargetsSuccess)
    .flatMap( (action: TargetActions) => {
      console.log("updateBooks");
      return[
        new UpdateAllTargets(action.payload),
        new ToggleTargetsLoader(false),
      ]
    });

  @Effect()
  hideLoader = this.actions
    .ofType(TargetActionTypes.LoadAllTargetsError)
    .flatMap((action) => {
      console.log("LoadAllTargetsError");
      return [new ToggleTargetsLoader(false)]
    })
}
