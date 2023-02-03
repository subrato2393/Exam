import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { TeamDetailsService } from '../../services/teamdetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-teamdetails',
  templateUrl: './new-teamdetails.component.html',
  styleUrls: ['./new-teamdetails.component.css']
})
export class NewTeamDetailsComponent implements OnInit {

  TeamForm!: FormGroup;
  genderList:any;
  buttonText !:string;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private teamDetailsService: TeamDetailsService,private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('teamDetailsId'); 
    if(id){
      this.buttonText="Update"
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

    else{
      this.buttonText="Save"
    }
    console.log("yyyyyyy");
    console.log(id);

    this.intitializeForm();
    this.getAllGender();
  }

  intitializeForm() {
    this.TeamForm = this.fb.group({
      teamId: [0],
      teamName:['',Validators.required],
      teamDescription:['',Validators.required],
      approvedByDirector:[0],
      aprovedByManager:[0],
      member:  this.fb.array([
        this.createMemberForm()
      ]), 
    })
  }

  private createMemberForm() {
    return this.fb.group({
      name: ['',Validators.required],
      dateOfBirth:['',Validators.required],
      contactNo:['',Validators.required],
      genderId:['',Validators.required],
    });
  }

 get teamName(){
   return this.TeamForm.get('teamName')
 }
 get teamDescription(){
  return this.TeamForm.get('teamDescription')
}

get name(){
  return this.TeamForm.get('member')
}

  
  getAllGender(){
      this.teamDetailsService.getAllGender().subscribe((res)=>{
        this.genderList =res;
        console.log("gender list");
        console.log(this.genderList);
      }
      )
  }
  get teamDetails() {
    return this.TeamForm.get('member') as FormArray
  }

  addNewMember(){
    const control=<FormArray>this.TeamForm.controls['member'];
    control.push(this.createMemberForm()); 
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
      this.teamDetailsService.submit(this.TeamForm.value).subscribe(response => {
        this.reloadCurrentRoute();
        this.snackBar.open('Information Inserted Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-show']
        });
      })
    }
}
