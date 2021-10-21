import { Component, HostListener} from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crm-website';
  public loggedIn=false;
  isRefreshed = false;
  browserRefresh = false;
  constructor(private loginService: LoginService,){
    window.addEventListener('keydown', event => {
      if (event.key == 'r' || event.key == 'F5' || event.key == 'unload' || event.key == 'reload') this.isRefreshed = true;
  });
  }
  
  ngOnInit(): void {
    
    this.loggedIn=this.loginService.isLoggedIn();
  }
  @HostListener('window:beforeunload', ['$event'])
    onBeforeUnload(event: Event) {
        if (!this.isRefreshed) {
         // this.loginService.logout();
        }
    }
}
