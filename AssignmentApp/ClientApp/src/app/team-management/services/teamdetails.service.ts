import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
//import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
  constructor(private http:HttpClient) { }

  getAllGender(){
    return this.http.get<any>("https://localhost:7172/api/Gender/getall-gender");
  }

  find(id:any){
    return this.http.get<any>("https://localhost:7172/api/TeamDetailsControllers/getteam-details/"+id+"");
  }

  updateApprovedByDirector(id:any,statusValue:any){
    return this.http.put("https://localhost:7172/api/TeamDetailsControllers/update-teamstatusby-director/"+id,statusValue);
  }
  updateApprovedByManager(id:any,statusValue:any){
    return this.http.put("https://localhost:7172/api/TeamDetailsControllers/update-teamstatusby-manager/"+id,statusValue);
  }
  submit(model:any){
   return this.http.post("https://localhost:7172/api/TeamDetailsControllers/save-Team",model)
  }
 
  update(model:any){
  return this.http.put("https://localhost:7024/api/Products/update-product",model);
  }

  delete(id:any){
    return this.http.delete("https://localhost:7172/api/TeamDetailsControllers/delete-teamdetails/"+id);
  }

  getAll(){
    return this.http.get<any[]>("https://localhost:7172/api/TeamDetailsControllers/getall-team-details");
  }

}
