import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login.service";
import { AlertService } from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{

    constructor(private loginService: LoginService, private router: Router, private alertmsg: AlertService, ){

    }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.loginService.isLoggedOut()){
        return true;
      }
      this.router.navigate(['/dashboard'])
        return false;
    }
  }
