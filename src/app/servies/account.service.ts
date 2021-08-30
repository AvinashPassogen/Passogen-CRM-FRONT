import { Injectable } from '@angular/core';
import { Account } from "../models/account";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/api/account'
  
  private Url = 'http://localhost:8080/api/accountCount'
  constructor(private http: HttpClient) { }

  
  getAllAccounts() {
    return this.http.get<Account>(this.baseUrl).pipe();
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAccount(id: number) {
    return this.http.get<Account>(this.baseUrl + '/' + id).pipe();
  }

  updateAccount(id: number, account: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, account);
  }

  createAccount(account: any): Observable<Object> {
    console.log(account);
    return this.http.post(`${this.baseUrl}`, account);
  }


  findByType(type) {
    return this.http.get(`${this.baseUrl}?type=${type}`);
  }

  findByTitle(account_name) {
    return this.http.get(`${this.baseUrl}?type=${account_name}`);
  }

  getCount(){
    return this.http.get(`${this.Url}`);
  }
}
