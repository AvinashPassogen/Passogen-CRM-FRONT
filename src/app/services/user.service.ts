import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  urltt="http://localhost:8080"
  constructor(private http: HttpClient) { }

getUser(){
  return this.http.get(`${this.urltt}/getusers`)
  
}

changePass(){
  return this.http.get(`${this.urltt}/change-password`)
}

}
