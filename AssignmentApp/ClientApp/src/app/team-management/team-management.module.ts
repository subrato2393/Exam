import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamManagementRoutingModule } from './team-management-routing.module';
import {NewTeamDetailsComponent} from './teamdetails/new-teamdetails/new-teamdetails.component'
import {TeamListComponent} from './teamdetails/team-list/team-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NewTeamDetailsComponent,
    TeamListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamManagementRoutingModule
  ]
})
export class TeamManagementModule { }
