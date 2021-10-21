import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user = new User();
  msg='';
  msg1='';
  forgotmsg='';
  emailmsg='';
  emailexists='';
  public show: boolean = false;
  public hide: boolean=  true;
  public buttonName: any = '';

  public showForgot: boolean = false;
  public hideForgot: boolean= true;
  public showPassword: boolean = false;
  public showOtp: boolean = false;
  public buttonForgot: any='';
  countries: {};
  credentials: any = {};
  resetp: any = {};
  forgotPass: any = {};
  veriotp: any = {};
 
  constructor( private loginService: LoginService,private alertmsg: AlertService, 
    private apiService: ApiService,private router: Router, private cookieService: CookieService ) {
      
     }


  ngOnInit() {
    this.apiService.getAllCountries().subscribe(
      data => this.countries = data
    );  
  }
  submitted = false;
  get f() { return this.singupForm.controls; }
  get c() { return this.forgotForm.controls; }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl('')
  })
  forgotForm = new FormGroup({
    email: new FormControl('', Validators.required),
  })
  
  otpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    userotp: new FormControl('', Validators.required),
  })
  
  passwordFrom = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  singupForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    job_title: new FormControl(''),
    employees: new FormControl(''),
    country: new FormControl(''),
    password: new FormControl('', Validators.required)
  })
  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }

  get email(){
    return this.forgotForm.get('email')
  }

  get newpassword(){
    return this.forgotForm.get('password')
  }

  get userotp(){
    return this.otpForm.get('userotp')
  }
  
  toggle() {
     
    this.show = !this.show;
    this.hide = !this.hide;
    if (this.show)
      this.buttonName = "";
    else(this.hide)
    {
    }
      this.buttonName = "";
  }

  forgot(){
    this.showForgot = !this.showForgot;
    this.hide = !this.hide;
    if (this.showForgot)
      this.buttonForgot = "";
    else(this.hide)
    {
    }
      this.buttonForgot = "";
  }

  otpContainer(){
    this.showForgot = !this.showForgot;
    this.showOtp = !this.showOtp;
    if (this.showForgot)
      this.buttonForgot = "";
    else(this.hide)
    {
    }
      this.buttonForgot = "";
  }

  passwordContainer(){
    this.showOtp = !this.showOtp;
    this.showPassword = !this.showPassword;
    if (this.showOtp)
      this.buttonForgot = "";
    else(this.hide)
    {
    }
      this.buttonForgot = "";
  }

  submit(){
    
    

    this.submitted = true;
    // stop here if form is invalid
    if (this.singupForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.loginService.createUser(this.singupForm.value).subscribe(data =>{
        console.log(this.singupForm.value);
        this.singupForm.reset();

    },error=>{
      console.log(error);
      this.emailexists="EmailId or Username is Allready Exists";
    }
    );
      
    }
    
    
  }
  

  onForgot(){
    if((this.forgotPass.email!='' )&& 
    (this.forgotPass.email!=null) ) 
    {
      this.loginService.forgotPassword(this.forgotPass).subscribe(
        (response:any) =>{
          this.otpContainer();
      },error=>{
        this.emailmsg="EmailId is not Valid";

      }
      );
    }else{
      this.forgotmsg="Fields Are Empty";

    }
  }


  onSubmit(){
    if((this.credentials.username!='' && this.credentials.password!='')&& (this.credentials.username!=null && this.credentials.password!=null) ) 
    {
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          if(this.loginForm.value.remember == true){
            this.cookieService.set('username',this.loginForm.value.username);
            this.cookieService.set('password',this.loginForm.value.password);
          }else{
          }

          localStorage.setItem('token', response.token);
          window.location.href="/dashboard"
        },
        error=>{
          this.ErrorMsg();
        }
        
      )
      
    }else{
      console.log("Fields Are Empty");
      this.msg="Fields Are Empty";

    }
  }

  
  sentotp(){
      this.loginService.verifyotp(this.forgotPass).subscribe(
        (response:any) =>{console.log(response);
          this.passwordContainer();
      },error=>{
        console.log(error);

      }
      );
    
  }

  sentpass(){
    console.log(this.forgotPass);
    this.loginService.resetPass(this.forgotPass).subscribe(
      (response:any) =>{console.log(response);
        location.reload();
    },error=>{
      console.log(error);

    }
    );
  }
  ErrorMsg(){
    this.alertmsg.showError("Username or Password is not valid", "Passogen Technology");
  }

  loginMsg(){
    this.alertmsg.showSuccess("Your Login Successfully !!", "Passogen Technology");
  }
}
