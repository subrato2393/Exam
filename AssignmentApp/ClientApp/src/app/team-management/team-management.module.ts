import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamManagementRoutingModule } from './team-management-routing.module';
import {NewTeamDetailsComponent} from './teamdetails/new-teamdetails/new-teamdetails.component'
import {TeamListComponent} from './teamdetails/team-list/team-list.component'


@NgModule({
  declarations: [
    NewTeamDetailsComponent,
    TeamListComponent
  ],
  imports: [
    CommonModule,
    TeamManagementRoutingModule
  ]
})
export class TeamManagementModule { }
