import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],
  declarations: [],
  exports:[
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],
})
export class SharedModule { }
