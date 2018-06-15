import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {MessageState} from "@app/features/monitor/monitor.module";
import {CreateNewMessage, ToggleMessageDialog} from '@app/features/monitor/actions/message.actions'
import {selectIsLadingCreateMessage} from '@app/features/monitor/reducers/message.reducer'
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Constants} from "@app/Constants";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  @Input('destReconunit') destReconunit: any;
  showCreateNewMessageLoader$: Observable<boolean>;

  constructor(private store: Store<MessageState>) {
    this.showCreateNewMessageLoader$ = this.store.select(selectIsLadingCreateMessage)
  }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    this.store.dispatch(new CreateNewMessage({
      src_reconunitid: Constants.reconUnits.hq,
      dest_reconunitid: this.destReconunit.id,
      message: form.value.messageText
    }))
  }

  cancel(){
    this.store.dispatch(new ToggleMessageDialog(false, null))
  }

}
