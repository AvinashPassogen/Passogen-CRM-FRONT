import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AlertService } from './services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = 'http://localhost:8080/register'
  private baseUrl = 'http://localhost:8080'
  constructor(private http: HttpClient,public router: Router, private alertmsg: AlertService,) { }

generateToken(credentials: any){
  return this.http.post(`${this.baseUrl}/token`, credentials);
  
}
  createUser(user: any): Observable<Object> {  
    console.log(user);  
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUser(){
    return this.http.get<User>("http://localhost:8080/getUser");
  }

  isLoggedIn()
  {
    let token=localStorage.getItem("token");
    if(token==undefined || token==='' ||  token==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  isLoggedOut()
  {
    let token=localStorage.getItem("token");
    if(token==undefined || token==='' ||  token==null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout()
  {
    localStorage.removeItem('token')
    return true;
  }
  
  getToken()
  {
    return localStorage.getItem("token")
  }

  forgotPassword(forgot){
    return this.http.post(`${this.baseUrl}/send-otp`, forgot,{responseType: 'text'});

  }

  getSession(){
    return localStorage.getItem("session");
  }

  resetPass(resetp){
    return this.http.post(`${this.baseUrl}/change-password`, resetp,{responseType: 'text'});

  }

  verifyotp(otp){
    return this.http.post(`${this.baseUrl}/forgot`, otp,{responseType: 'text'});

  }
  

  changePass(user: any): Observable<Object>{
    return this.http.post<any>("http://localhost:8080/new-password",user);
  }

  
  loginMsg(){
    this.alertmsg.showSuccess("LogIn Successfully !!", "Passogen Technology");
  }
}
