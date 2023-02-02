import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { TeamDetailsService } from '../../services/teamdetails.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-teamdetails',
  templateUrl: './new-teamdetails.component.html',
  styleUrls: ['./new-teamdetails.component.css']
})
export class NewTeamDetailsComponent implements OnInit {

  TeamForm!: FormGroup;

  constructor(private fb: FormBuilder,private teamDetailsService: TeamDetailsService,private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('teamDetailsId'); 
    if(id){
      this.teamDetailsService.find(+id).subscribe(
        res => {
          this.TeamForm.patchValue({     
             teamDetailsId:res.teamDetailsId,      
             teamName:res.teamName, 
             teamDescription: res.teamDescription
          });     
        console.log("res");
      console.log(res)
        }
      );
    }
    console.log("yyyyyyy");
    console.log(id);

    this.intitializeForm();
  }

  intitializeForm() {
    this.TeamForm = this.fb.group({
      teamId: [0],
      teamName:[''],
      teamDescription:[''],
      approvedByDirector:[0],
      aprovedByManager:[0],
      member:  this.fb.array([
        this.createMemberForm()
      ]), 
    })
  }

  private createMemberForm() {
    return this.fb.group({
      name: [''],
      dateOfBirth:[''],
      contactNo:[],
      genderId:[''],
    });
  }

  
  get teamDetails() {
    return this.TeamForm.get('member') as FormArray
  }

  addNewMember(){
    const control=<FormArray>this.TeamForm.controls['member'];
    control.push(this.createMemberForm()); 
  }
  onSubmit() {
   // const id = this.TeamForm.get('acceptanceId').value;  
   // console.log(id);
      this.teamDetailsService.submit(this.TeamForm.value).subscribe(response => {
        // this.router.navigateByUrl('/product-management/acceptance-list');
        // this.snackBar.open('Information Inserted Successfully ', '', {
        //   duration: 2000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        //   panelClass: 'snackbar-success'
        // });
      }, error => {
        //this.validationErrors = error;
      })
    }
}
