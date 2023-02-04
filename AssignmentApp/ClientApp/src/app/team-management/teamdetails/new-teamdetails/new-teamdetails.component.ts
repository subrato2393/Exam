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
  memberList !:any[];

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private teamDetailsService: TeamDetailsService,private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('teamDetailsId'); 
    if(id){
      this.buttonText="Update"
      console.log("ddd");

      this.teamDetailsService.find(+id).subscribe(
        
        res => {
          this.TeamForm.patchValue({     
             teamDetailsId:res.teamDetails.teamDetailsId,      
             teamName:res.teamDetails.teamName, 
             teamDescription: res.teamDetails.teamDescription,
             aprovedByManager: res.teamDetails.aprovedByManager,
             approvedByDirector: res.teamDetails.approvedByDirector,
          });     
          this.memberList =res.memberDetails
          console.log("member list");
          console.log(res);
          this.getMemberDetails();
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
      memberId:[],
      name: ['',Validators.required],
      dateOfBirth:['',Validators.required],
      contactNo:['',Validators.required],
      genderId:['',Validators.required],
    });
  }


getMemberDetails(){
  (this.TeamForm.controls.member as FormArray).reset(); //reset the FormArray

   //reset the FormArray this.formatDate(new Date())

  this.memberList.forEach(x => {
      (this.TeamForm.controls.member as FormArray)
      .push(this.fb.group({
        memberId: [x.memberId],
        name: [x.name, Validators.required],
        dateOfBirth: [this.formatDate(x.dateOfBirth), Validators.required],
        contactNo: [x.contactNo, Validators.required],
        genderId: [x.genderId, Validators.required]
      })
      )
  });
  (this.TeamForm.controls.member as FormArray).removeAt(0);
}

private formatDate(date:any) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
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
    const id = this.route.snapshot.paramMap.get('teamDetailsId'); 

    if(id){
      console.log(this.TeamForm.value);

      //this.TeamForm.get('teamDetailsId').setValue(id);

       this.teamDetailsService.update(+id,this.TeamForm.value).subscribe(response => {
        this.router.navigateByUrl('/team-list');
        this.snackBar.open('Information Updated Successfully ', '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['snackbar-show']
            });
          })
        }
    else
    {
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
}
