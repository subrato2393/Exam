import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from '../../services/teamdetails.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamDetailsList:any;
  constructor(private teamDetailsService:TeamDetailsService,private snackBar: MatSnackBar) { }

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
        this.snackBar.open('Team Status Saved ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-show']
        });
        this.getAllTeamList();
      })
      console.log("Implement delete functionality here"); 
  }
  onCrossClickManager(id:any,value:any){
    this.teamDetailsService.updateApprovedByManager(id,value).subscribe((res)=>{
      this.snackBar.open('Team Status Saved ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-show']
      });
      this.getAllTeamList();
    })
  }
  onCircleClickManager(id:any,value:any){
    this.teamDetailsService.updateApprovedByManager(id,value).subscribe((res)=>{
      this.snackBar.open('Team Status Saved ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-show']
      });
      this.getAllTeamList();
    })
  }
  onCheckClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.snackBar.open('Team Status Saved ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-show']
      });
      this.getAllTeamList();
    })
  }
  onCrossClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.snackBar.open('Team Status Saved ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-show']
      });
      this.getAllTeamList();
    })
  }
  onCircleClickDirector(id:any,value:any){
    this.teamDetailsService.updateApprovedByDirector(id,value).subscribe((res)=>{
      this.snackBar.open('Team Status Saved ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-show']
      });
      this.getAllTeamList();
    })
  }
  
  deleteItem(team:any){
      const id = team.teamDetailsId; 
          this.teamDetailsService.delete(id).subscribe(() => {
            this.getAllTeamList();
            this.snackBar.open('Information Deleted Successfully ', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['snackbar-danger']
            });
          })     
     }
}
