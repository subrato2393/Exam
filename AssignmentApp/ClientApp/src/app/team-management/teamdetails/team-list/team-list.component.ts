import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from '../../services/teamdetails.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamDetailsList:any;
  constructor(private teamDetailsService:TeamDetailsService) { }

  ngOnInit(): void {
    this.getAllTeamList();
  }
  
  getAllTeamList(){
    this.teamDetailsService.getAll().subscribe((res)=>{
      this.teamDetailsList =res;
      console.log(this.teamDetailsList);
    }
    )
  }

  deleteItem(team:any){
    console.log(team)
  }
}
