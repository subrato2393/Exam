import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamManagementRoutingModule } from './team-management-routing.module';
import {NewTeamDetailsComponent} from './teamdetails/new-teamdetails/new-teamdetails.component'
import {TeamListComponent} from './teamdetails/team-list/team-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    NewTeamDetailsComponent,
    TeamListComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    TeamManagementRoutingModule
  ]
})
export class TeamManagementModule { }
