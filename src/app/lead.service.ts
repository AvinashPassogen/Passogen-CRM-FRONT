import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leads } from './leads';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private Url = 'http://localhost:8080/api/leadcount';
  private baseUrl = 'http://localhost:8080/api/leads';  
  tk = localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  getAllLeads(){
    
    return this.http.get<Leads>(this.baseUrl).pipe();
  }

  deleteleads(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  UpdateLeads(id, data) {
    console.log(id,data);
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

   Update(plid: number, leads: any): Observable<Object> {
     console.log(plid,leads);
     return this.http.put(`${this.baseUrl}/${plid}`, leads);
  }

  getLeads(id: number){
     return this.http.get<Leads>(this.baseUrl+'/'+id).pipe();
     }

  createLead(leads: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, leads);
  }

  findByTitle(company) {
    return this.http.get(`${this.baseUrl}?company=${company}`);
  }

  getCount(){
    return this.http.get(`${this.Url}`);
  }

   
}
