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
  onCheckClickManager(id:any,value:any){
      this.teamDetailsService.updateApprovedByManager(id,value).subscribe((res)=>
      {
        this.getAllTeamList();
      })
      console.log("Implement delete functionality here"); 
  }
  onCrossClickManager(id:any,value:any){
    this.teamDetailsService.updateApprovedByManager(id,value).subscribe((res)=>{
      this.getAllTeamList();
    })
  }
  onCircleClickManager(id:any,value:any){
    this.teamDetailsService.updateApprovedByManager(id,value).subscribe((res)=>{
      this.getAllTeamList();
    })
  }
  onCheckClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.getAllTeamList();
    })
  }
  onCrossClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.getAllTeamList();
    })
  }
  onCircleClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.getAllTeamList();
    })
  }
  
  deleteItem(team:any){
    console.log(team)
  }
}
