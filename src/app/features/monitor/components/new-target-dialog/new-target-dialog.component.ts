import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {TargetsState} from '@app/features/monitor/monitor.module';
import * as TargetActions from '../../actions/target.actions'
import {selectIsLadingCreateTarget} from '@app/features/monitor/reducers/target.reducer';
import {Observable, Subscription} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {TargetActionTypes} from '@app/features/monitor/actions/target.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-target-dialog',
  templateUrl: './new-target-dialog.component.html',
  styleUrls: ['./new-target-dialog.component.css']
})

export class NewTargetDialogComponent implements OnInit, OnDestroy {
  isSaving$: Observable<any>;
  subSaveSuccess: Subscription;
  latitude;
  longitude;

  constructor(private store :Store<TargetsState>,private updates$: Actions, private dialogRef: MatDialogRef<MatDialog>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isSaving$ = this.store.select(selectIsLadingCreateTarget);

    this.subSaveSuccess = updates$
      .ofType(TargetActionTypes.CreateNewTargetSuccess)
      .do(() => {this.dialogRef.close()})
      .subscribe();

  }

  ngOnInit() {
    if(this.data && this.data.coords){
      this.latitude = this.data.coords.lat;
      this.longitude = this.data.coords.lng;
    }
  }

  cancel(){
    this.dialogRef.close()
  }

  onSubmit(form : NgForm){
    form.value.reconunitid = 1;
    this.store.dispatch(new TargetActions.CreateNewTarget(form.value));
  }

  ngOnDestroy(){
    this.subSaveSuccess.unsubscribe()
  }

}
