import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {
  MessageActionTypes,
  MessageActions,
  CreateNewMessageError,
  CreateNewMessageSuccess,
  PostNewMessage,
  ToggleMessageDialog,
  ToggleNewMessageLoader
} from "../actions/message.actions"
import {MessageService} from "@app/core/message/message.service";
import {of} from "rxjs/observable/of";


@Injectable()
export class MessageEffect {
  constructor(private actions: Actions, private messageService: MessageService) {
  }

  @Effect()
  CreateNewMessage = this.actions
    .ofType(MessageActionTypes.CreateNewMessage)
    .flatMap((action: MessageActions) => [
      new PostNewMessage(action.payload),
      new ToggleNewMessageLoader(true)
    ]);

  @Effect()
  PostNewMessage = this.actions
    .ofType(MessageActionTypes.PostNewMessage)
    .mergeMap((action: MessageActions) =>
      this.messageService.postMessage(action.payload)
        .map(result => {
          if (result.success)
            return new CreateNewMessageSuccess();
          else {
            throw result.error;
          }
        })
        .catch(error => of(new CreateNewMessageError()))
      );

  @Effect()
  CreateNewMessageSuccess = this.actions
    .ofType(MessageActionTypes.CreateNewMessageSuccess)
    .flatMap( ()=>[
      new ToggleNewMessageLoader(false),
      new ToggleMessageDialog(false, null)
    ]);

  @Effect()
  CreateNewMessageError = this.actions
    .ofType(MessageActionTypes.CreateNewMessageError)
    .flatMap( ()=>[
      new ToggleNewMessageLoader(false)
    ]);

}
