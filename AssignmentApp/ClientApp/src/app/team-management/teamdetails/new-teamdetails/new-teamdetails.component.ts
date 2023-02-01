import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { TeamDetailsService } from '../../services/teamdetails.service';

@Component({
  selector: 'app-new-teamdetails',
  templateUrl: './new-teamdetails.component.html',
  styleUrls: ['./new-teamdetails.component.css']
})
export class NewTeamDetailsComponent implements OnInit {

  TeamForm!: FormGroup;

  constructor(private fb: FormBuilder,private teamDetailsService: TeamDetailsService) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.TeamForm = this.fb.group({
      teamId: [0],
      teamName:[''],
      teamDescription:[''],
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
