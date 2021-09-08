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
  constructor(
    public route:Router,
    public formBuilder: FormBuilder,private loginService: LoginService,
    public router: Router, private apiService: ApiService,
    public TaskService:TaskService,
    private _leadService: LeadService, private contactService: ContactsService, public taskService: TaskService,
    private opportunityService: OpportunityService, private accountService: AccountService) { }
    
     
  LeadForm: FormGroup;
  contactForm: FormGroup;
  AccountForm: FormGroup;
  OpportunityForm: FormGroup;
  taskForm: FormGroup;
  addForm: FormGroup;
  editProfileForm:FormGroup;
  countries: {};
  states: {};
  cities: {};
  id: number;
  
  error:string;
  today = new Date();
  tmrwDate = new Date(new Date().setDate(new Date().getDate() + 1));
  contacts: Contacts = new Contacts();
  opportunity: Opportunity = new Opportunity();
  tasks: Tasks = new Tasks();
  leads: Leads = new Leads();
  accounts: Account = new Account();

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

  
  createOrUpdatePolicy(id){
    this.taskService.UpdateTasks(id,this.selectedPolicy).subscribe(()=>{

    });
  }
  updateForm(id) {
    this.taskService.UpdateTasks(id, this.selectedPolicy).subscribe(()=>{
    });
  }
  submitted = false;
  get f() { return this.LeadForm.controls; }
   
  get o() { return this.OpportunityForm.controls; }
   
  get t() { return this.taskForm.controls; }

  get c() { return this.contactForm.controls; }
  
  get a() { return this.AccountForm.controls; }
  

  ngOnInit(): void {
    
      this.loginService.getUser().subscribe(
        data => {
          this.user = data;
        },error=>{
        console.log(error);
  
      }
      );
      this.taskService.getCount().subscribe(
        data =>{
          this.count = data;
        }
      )

    this.loggedIn=this.loginService.isLoggedIn();

    this.tasks = new Tasks();
    this.reloadData();
  
     this.addForm = this.formBuilder.group({
        
      subject:['',Validators.required],
      assigned:['',Validators.required],
      date1:['',Validators.required],
      t_name:['', Validators.required],
      comments:[''],
      priority:['', Validators.required],
      status:[''],
      date2:[''],
      time1:['']
    });
    this.taskForm = this.formBuilder.group({

      subject: ['', Validators.required],
      assigned: ['',Validators.required],
      date1: ['',Validators.required],
      t_name: ['',Validators.required],
      comments: ['',Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      date2: ['',Validators.required],
      time1: ['',Validators.required],

    });

    
    this.contactForm = this.formBuilder.group({
      salutation: ['', Validators.required],
      first_Name: ['', Validators.required],
      middle_Name: ['', Validators.required],
      last_Name: ['', Validators.required],
      title: [''],
      account_Name: ['',Validators.required],
      phone_Number: ['', [ Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      mobile_Number: ['', [ Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      email: ['', [ Validators.email]],
      reports_To: [''],
      department: [''],
      fax: [''],
      address: [''],
      pincode: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(6)]],
      country: [''],
      state: [''],
      city: [''],
      street: ['']
    });

    this.apiService.getAllCountries().subscribe(
      data => this.countries = data
    );

    
    this.LeadForm = this.formBuilder.group({
      salutation: ['',Validators.required],
      first_Name: ['', Validators.required],
      middle_Name: ['',Validators.required],
      last_Name: ['', Validators.required],
      title: [''],
      company_Name: ['', Validators.required],
      industry: [''],
      phone_Number: ['', [ Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      mobile_Number: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      email: ['', [ Validators.email]],
      lead_Status: ['',Validators.required],
      owner: ['',Validators.required],
      no_Of_Employees: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      lead_Source: [''],
      address: [''],
      pincode: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(6)]],
      country: [''],
      state: [''],
      city: [''],
      rating: ['']
    });

    this.OpportunityForm = this.formBuilder.group({
      opportunity_name: ['',Validators.required],
      opportunity_owner: ['',Validators.required],
      type: [''],
      primary_csource: [''],
      budget_confirmed: [''],
      close_date: ['',Validators.required],
      account_name: ['',Validators.required],
      next_step: [''],
      lead_source: [''],
      probability: [''],
      ROI_Analysis_Completed: [''],
      Discovery_Completed: [''],
      stage: ['',Validators.required],
      amount: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      description: [''],
      loss_reason: [''],
    });

   
    this.AccountForm = this.formBuilder.group({
      account_name:['',Validators.required],
      account_owner:['',Validators.required],
      type:[''],
      parent_account:[''],
      website:[''],
      phone_Number:['', [ Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      email:[],
      industry:[''],
      employee:[''],
      description:[''],
      address:[''],
      country:[''],
      state:[''],
      city:[''],
      pincode:['']
        
    });
  }
  uptasks(id: number,task){
    this.ngOnInit();
   
    this.route.navigate(['/Task-status',id]);
  }

  newcontacts(): void {
    this.contacts = new Contacts();
  }

  newAcc(): void{
    this.accounts = new Account();
  }
  reloadData() {
    this.TaskService.getAllTasks().subscribe(
      (data:Tasks) => this.tasks=data,
      
    );
  }

  logout(){
    this.loginService.logout()
    location.reload();
  }

  
  newleads(): void {
    this.leads = new Leads();
  }

  onSubmit() {
    this._leadService.createLead(this.LeadForm.value)
      .subscribe(data => {
        console.log("Form Submitted!");
        this.LeadForm.reset();
        this.router.navigate(['/view']);
      });
  }



  Submitdata() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.LeadForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this._leadService.createLead(this.LeadForm.value)
      .subscribe(data => {
        this.router.navigate(['/view']);
      });
      this.refresh();
      $("#custom-modal").modal("hide");
    }
    
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.apiService.getStateByCountryId(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.apiService.getCityByStateId(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  onSubmitContact() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.contactService.createContacts(this.contactForm.value)
      .subscribe(data => {
        console.log("Form Submitted!");
        this.LeadForm.reset();
      });
      this.refresh();
      $("#contact-modal").modal("hide");
    }
    

  }
  
  selectPolicy(tasks: Tasks){
    this.selectedPolicy = tasks;
  }

  SubmitContact() {
    console.log("Form Submitted!");
    this.contactService.createContacts(this.contactForm.value)
      .subscribe(data => {
        this.router.navigate(['/viewContact']);
      });
  }
  refresh(): void {
    window.location.reload();
   }

  newtasks(): void {
    this.tasks = new Tasks();
  }

  submitTask() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.taskForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.taskService.createTask(this.taskForm.value).subscribe(data => {
        console.log("Submitted");
      //  this.router.navigate(['/view']);
  
      });
      this.refresh();
      $("#task-modal").modal("hide");
    }
   
   
    //console.log("Submitted");
  }
  onSubmitTask() {
    
      // console.log("Reset Submitted");
      this.taskService.createTask(this.taskForm.value).subscribe(data => {
        console.log(this.taskForm.value);
        // this.taskForm.reset();
      
      });
    
  }


  formatDate1(date1: Date): string {
    const day = date1.getDate();
    const month = date1.getMonth();
    const year = date1.getFullYear();
    return `${year}-${month}-${day}`;
  }
  formatDate2(date2: Date): string {
    const day = date2.getDate();
    const month = date2.getMonth();
    const year = date2.getFullYear();
    
    return `${year}-${month}-${day}`;
  }

  submitOppo(){
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.OpportunityForm.value);
    if (this.OpportunityForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.opportunityService.createOpportunity(this.OpportunityForm.value)
      .subscribe(data => {
        
      });
      // this. resetForm();
      $("#opportunitymodal").modal("hide");
    }
    
  }

  onSubmitOppo() {
    this.opportunityService.createOpportunity(this.OpportunityForm.value)
      .subscribe(data => {
        // this.router.navigate(['/view']);
      });
  }

  onSubmitAccounts() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AccountForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.accountService.createAccount(this.AccountForm.value)
    .subscribe(data => {
     console.log("Form Submitted!");
      this.AccountForm.reset();
    });
      this.refresh();
      $("#account_modal").modal("hide");
    }
    
    
  
  }
  
  resetForm(){
    this.OpportunityForm.reset();
    this.AccountForm.reset();
    this.taskForm.reset();
    this.contactForm.reset();
    // this.LeadForm.reset();
    // this.refresh();
    this.LeadForm.reset();
     
  }

    
  selectTask(tasks: Tasks){
    this.selectedPolicy = tasks;
  } 
    

  logoutUser()
  {
    this.loginService.logout()
    location.reload();
  }
}