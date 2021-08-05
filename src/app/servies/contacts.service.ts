import { Injectable } from '@angular/core';
import { Contacts } from "../models/contacts";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = 'http://localhost:8080/api/Contacts'

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get<Contacts>(this.baseUrl).pipe();
  }

  deleteContacts(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getContacts(id: number) {
    return this.http.get<Contacts>(this.baseUrl + '/' + id).pipe();
  }

  updateContacts(id: number, contacts: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, contacts);
  }

  createContacts(contacts: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, contacts);
  }

  findByTitle(title) {
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }
}
