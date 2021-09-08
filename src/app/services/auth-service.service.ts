import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  getToken() {
    return localStorage.getItem('token')
  }
}
