import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public loggedIn = false;
  public show: boolean = true;
  public hide: boolean=  false;
  public showprofile: boolean = false;
  public buttonName: any = '';
  user:any
  userDa:any
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    this.userInfo();
  }
  
  changePassForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  userData = new FormGroup({
    username: new FormControl('', Validators.required),
  })

  toggle() {
     
    this.show = !this.show;
    this.hide = !this.hide;
    if (this.show == true)
      this.buttonName = "";
    else(this.hide == true)
    
      this.buttonName = "";
      
  }

  toggleProfile() {
     
    this.showprofile = !this.showprofile;
    this.hide = !this.hide;
    if (this.show == true)
      this.buttonName = "";
    else(this.hide == true)
    
      this.buttonName = "";
  }
  changePass(){
    this.loginService.changePass(this.changePassForm.value).subscribe(
      (response:any) =>{console.log(response);

    },error=>{
      console.log(error);

    }
    );
  }

  userInfo(){
    this.loginService.getUser().subscribe(
      (data: User) => {
        const str1 = data.username;
        const str2 = data.job_title;
        const str3 = data.phone_number;
        const str4 = data.first_name +" "+ data.last_name;
        const str5 = data.email;
        const str6 = data.company;
        
        var userName = str1;
        var job_title = str2;
        var phone_number = str3;
        var full_name = str4;
        var email = str5;
        var company = str6;

        document.getElementById("work1").innerHTML= userName;
        document.getElementById("work2").innerHTML= job_title;
        document.getElementById("work3").innerHTML= phone_number;
        document.getElementById("work4").innerHTML= full_name;
        document.getElementById("work5").innerHTML= email;
        document.getElementById("work6").innerHTML= company;

      },error=>{
      console.log(error);

    }
    );
  }
  
}
