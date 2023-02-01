import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
//import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
  constructor(private http:HttpClient) { }

  find(id:any){
    return this.http.get<any>("https://localhost:7024/api/Products/getbyid?id="+id+"");
  }

  submit(model:any){
   return this.http.post("https://localhost:7172/api/TeamDetailsControllers/save-Team",model)
  }
 
  update(model:any){
  return this.http.put("https://localhost:7024/api/Products/update-product",model);
  }

  delete(id:any){
    return this.http.delete("https://localhost:7024/api/Products/delete-product?id="+id);
  }

  getAll(){
    return this.http.get<any[]>("https://localhost:7172/api/TeamDetailsControllers/getall-team-details");
  }

}
