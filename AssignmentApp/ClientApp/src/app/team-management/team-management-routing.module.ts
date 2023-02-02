import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewTeamDetailsComponent} from './teamdetails/new-teamdetails/new-teamdetails.component'
import {TeamListComponent} from './teamdetails/team-list/team-list.component'

const routes: Routes = [
  { 
    path:  '',
    redirectTo:'team-management',
    pathMatch: 'full', 
  },
  { 
    path: 'new-teamdetails', 
    component: NewTeamDetailsComponent 
  },
  { 
    path: 'update-teamdetails/:teamDetailsId', 
    component: NewTeamDetailsComponent 
  },
  { 
    path: 'team-list', 
    component: TeamListComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamManagementRoutingModule { }
