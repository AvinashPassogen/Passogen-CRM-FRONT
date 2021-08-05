
import { Injectable } from '@angular/core';
import { Opportunity } from "../models/opportunity";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  
  private baseUrl = 'http://localhost:8080/api/Oppo'

  constructor(private http: HttpClient) { }


  getAllOppo() {
    return this.http.get<Opportunity>(this.baseUrl).pipe();
  }

  deleteOpportunity(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }

  getOpportunityById(id: number) {
    return this.http.get<Opportunity>(this.baseUrl + '/' + id).pipe();
  }

  updateOpportunity(id: number, opportunity: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, opportunity);
  }

  createOpportunity(opportunity: any): Observable<Object> {
    console.log(opportunity);
    return this.http.post(`${this.baseUrl}`, opportunity);
  }

  findByStage(stage) {
    return this.http.get(`${this.baseUrl}?stage=${stage}`);
  }
  
}
