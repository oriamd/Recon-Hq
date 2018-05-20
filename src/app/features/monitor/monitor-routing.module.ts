import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DesktopComponent} from "@app/features/monitor/components/desktop/desktop.component";


const routes: Routes = [
  {path:'',component:DesktopComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
