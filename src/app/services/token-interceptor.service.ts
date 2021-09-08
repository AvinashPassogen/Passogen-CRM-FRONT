import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private Injector: Injector) { }

  intercept(req, next){
    let authService = this.Injector.get(AuthServiceService)
    let tokenizedReq = req.clone({
      setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
