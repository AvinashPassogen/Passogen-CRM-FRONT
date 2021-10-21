import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LeadService } from '../lead.service';
import { Leads } from '../leads';
import { TaskService } from '../servies/task.service';
import { Tasks } from "../models/tasks";
import { Contacts } from "../models/contacts";
import { ContactsService } from '../servies/contacts.service';
import { OpportunityService } from '../servies/opportunity.service';
import { Opportunity } from '../models/opportunity';
import { Account } from '../models/account';
import { AccountService } from '../servies/account.service';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
  declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedIn=false;
  count: any;
  user: any;
  private sub : any;
  constructor(
    public route:Router,
    public formBuilder: FormBuilder,private loginService: LoginService,
    public router: Router, private apiService: ApiService,
    public TaskService:TaskService,
    private _leadService: LeadService, private contactService: ContactsService, public taskService: TaskService,
    private opportunityService: OpportunityService, private accountService: AccountService) {  }
   
  tasks: Tasks;

  selectedPolicy : Tasks = {
    id:null,
    subject: null,
    assigned: null,
    date1: null,
    t_name: null,
    comments: null,
    priority: null,
    status: null,
    date2: null,
    time1: null
  };


  ngOnInit(): void {

    this.getTaskCount();
    
      this.loginService.getUser().subscribe(
        data => {
          this.user = data;
        },error=>{
        console.log(error);
  
      }
      );
      this.TaskService.getTodaysTask().subscribe(
        (data:Tasks) => this.tasks=data
      );
      

    this.loggedIn=this.loginService.isLoggedIn();

  }
  logout(){
    this.loginService.logout()
    location.reload();
  }

  
  logoutUser()
  {
    this.loginService.logout()
    location.reload();
  }

  ngOnDestroy() {
    this.count =0;
    this.tasks=null;
  }

  getTaskCount(){
    this.taskService.getCount().subscribe(
      data =>{
        this.count = data;
      }
    )
  }
  
}