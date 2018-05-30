import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [],
  exports:[
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
})
export class SharedModule { }
