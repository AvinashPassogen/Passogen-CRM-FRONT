import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  public show: boolean = true;
  public hide: boolean=  false;
  public buttonName: any = '';
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  
  changePassForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  toggle() {
     
    this.show = !this.show;
    this.hide = !this.hide;
    if (this.show == true)
      this.buttonName = "";
    else(this.hide)
    {
    }
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
}
