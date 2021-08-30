import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TaskService } from './../servies/task.service';
import { Account} from "./../models/account";
import { AccountService } from './../servies/account.service';
import { LeadService } from "../lead.service";
import { Leads } from "../leads";
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from './../servies/contacts.service';
import { Contacts} from "./../models/contacts";
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  close_date = [];
  amount = [];
  stage = [];
  data = [];
  status = [];
  won = 0;
  lost = 0;
  painding = 0;
  unqualified = 0;
  new = 0;
  working = 0;
  nurturing = 0;
  qualified = 0;
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  leads: Leads;
  contacts:Contacts;
  lead:any;
  error: string;
  plid: number;
  lead_Status: number;
  taskCount: any;
  leadCount: any;
  accCount: any;
  contactCount: any;
  oppocount: any;
  public show: boolean = true;
  public hide: boolean = false;
  public buttonName: any = '';
  public myColor:string = 'blue';
  public n1;
  countries: {};
  states: {};
  cities: {};
  id: number;
  account:Account;
  selectedPolicy:  Account  = {
    id: null,
    account_name: null,
	  account_owner: null,
	  type: null,
	  website: null,
	  parent_account: null,
	  description: null,
    industry: null,
    phone_Number: null,
    address: null,
    pincode: null,
    country: null,
    state: null,
    city: null,
    employee: null,
};
selectedPolicyc: Contacts = {
  id:null,
  salutation: null,
  first_Name: null,
  middle_Name: null,
  last_Name: null,
  title: null,
  account_Name: null,
  phone_Number: null,
  mobile_Number: null,
  email: null,
  reports_To: null,
  department: null,
  fax: null,
  address: null,
  pincode: null,
  country: null,
  state: null,
  city: null,
  street: null
};
  LeadForm: FormGroup;
  editProfileForm = new FormGroup({
    salutation:new FormControl(''),
    first_Name:new FormControl(''),
    middle_Name:new FormControl(''),
    last_Name:new FormControl(''),
    title:new FormControl(''),
    company_Name:new FormControl(''),
    industry:new FormControl(''),
    phone_Number:new FormControl(''),
    mobile_Number:new FormControl(''),
    email:new FormControl(''),
    lead_Status:new FormControl(''),
    owner:new FormControl(''),
    no_Of_Employees:new FormControl(''),
    lead_Source:new FormControl(''),
    address:new FormControl(''),
    pincode:new FormControl(''),
    country:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    rating:new FormControl(''),
    account_name:new FormControl(''),
    account_owner:new FormControl(''),
    employee:new FormControl(''),
    description:new FormControl(''),
    type:new FormControl(''),
    website:new FormControl(''),
    parent_account:new FormControl(''),
})
editForm = new FormGroup({
  id : new FormControl(''),
  subject: new FormControl(''),
  assigned: new FormControl(''),
  date1: new FormControl(''),
  t_name: new FormControl(''),
  comments: new FormControl(''),
  priority: new FormControl(''),
  status: new FormControl(''),
  date2: new FormControl(''),
  time1: new FormControl(''),
})
  nleads: Leads = new Leads();
  tasks:Tasks;
  task:Tasks;
  today = new Date();
  today1 = new Date();
  tmrwDate = new Date(new Date().setDate(new Date().getDate() + 1));
  selectedTask : Tasks = {
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
  selectedLeads:  Leads  = { plid: null,
    salutation: null,
  first_Name: null,
  middle_Name: null,
  last_Name: null,
  title: null,
  company_Name: null,
  industry: null,
  phone_Number: null,
  mobile_Number: null,
  email: null,
  lead_Status: null,
  owner: null,
  no_Of_Employees: null,
  lead_Source: null,
  address: null,
  pincode: null,
  country: null,
  state: null,
  city: null,
  rating: null};
  
  constructor(private formBuilder: FormBuilder,private fb: FormBuilder,private accountService:AccountService,private taskService:TaskService,private TaskService:TaskService,
    private router: Router,private leadService:LeadService,private http: HttpClient,private ContactsService:ContactsService,private route: ActivatedRoute,private apiService: ApiService,
    
    ) { 
      this.http.get('http://localhost:8080/api/OppoAll').subscribe(data => {
        for(let i in data){
          this.stage.push(data[i].stage);   
          if((data[i].stage) == 5){
            this.won = ++this.won;
          }
          else if((data[i].stage) == 6){
            this.lost = ++this.lost;
          }  
          else if((data[i].stage) !== 5 && (data[i].stage) !== 6){
            this.painding = ++this.painding;
          }         
        }
        let chartdata = {
        labels: ["Won","Lost","Pending"],
        datasets:[
          {
            label:"Status",
            fill: false,
            lineTension:0.1,
            backgroundColor:[  
              "#6658dd","#fa5c7c","#4fc6e1","#ebeff2 "
            ],  
            data:[this.won, this.lost,this.painding]
          }
      
        ]
      };
      const canvas = <HTMLCanvasElement> document.getElementById('pie-chart-example');
      const ctx = canvas.getContext('2d');

      let LineGraph = new Chart(ctx, {
        type:'pie',
        data:chartdata,
      });
    }, error => console.error(error));

    this.http.get(`http://localhost:8080/api/leadsAll`).subscribe(data=> {
      for(let i in data){
        this.status.push(data[i].lead_Status);   
        if((data[i].lead_Status) == 1){
          this.unqualified = ++this.unqualified;
        }
        else if((data[i].lead_Status) == 2){
          this.new = ++this.new;
        }  
        else if((data[i].lead_Status) == 3){
          this.working = ++this.working;
        } 
        else if((data[i].lead_Status) == 4){
          this.nurturing = ++this.nurturing;
        }
        else if((data[i].lead_Status) == 5){
          this.qualified = ++this.qualified;
        }        
      }
      let chartdata = {
      labels: ["Unqualified","New","Working","Nurturing","Qualified"],
      datasets:[
        {
          label:"Status",
          fill: false,
          lineTension:0.1,
          backgroundColor:[  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                 
          ],  
          data:[this.unqualified, this.new,this.working, this.nurturing, this.qualified]
        }
    
      ]
    };
    const canvas = <HTMLCanvasElement> document.getElementById('bar-chart-example');
    const ctx = canvas.getContext('2d');

    let LineGraph = new Chart(ctx, {
      type:'bar',
      data:chartdata,
    });
      }, error => console.error(error)
    );
  }
  addForm: FormGroup;
    submitted = false;
    ngOnInit(): void {

      this.taskService.getAllCount().subscribe(
        data =>{
          this.taskCount = data;
        }
      )

      this.leadService.getCount().subscribe(
        data =>{
          this.leadCount = data;
        }
      )

      this.accountService.getCount().subscribe(
        data =>{
          this.accCount = data;
        }
      )

      this.ContactsService.getCount().subscribe(
        data =>{
          this.contactCount = data;
        }
      )
      
      this.account = new Account();
      this.contacts = new Contacts();
      this.reloadacc();
      this.tasks = new Tasks();
      this.reloadTask();
      this.reloadLead();
    this.reloadcon();
    this.addForm = this.formBuilder.group({
      salutation:[''],
      first_Name:['', Validators.required],
      middle_Name:[''],
      last_Name:['', Validators.required],
      title:[''],
      account_Name:[''],
      phone_Number:[''],
      mobile_Number:[''],
      email:[''],
      reports_To:[''],
      department:[''],
      fax:[''],
      address:[''],
      pincode:[''],
      country:[''],
      state:[''],
      city:[''],
      street:['']
    });
      this.lead.getLeads(this.route.snapshot.params.id).subscribe((result) => {
        console.log(result);
        this.editProfileForm = new FormGroup({
          plid: new FormControl(result['plid']),
          salutation:new FormControl(result['salutation']),
          first_Name:new FormControl(result['first_Name']),
          middle_Name:new FormControl(result['middle_Name']),
          last_Name:new FormControl(result['last_Name']),
          title:new FormControl(result['title']),
          company_Name:new FormControl(result['company_Name']),
          industry:new FormControl(result['industry']),
          phone_Number:new FormControl(result['phone_Number']),
          mobile_Number:new FormControl(result['mobile_Number']),
          email:new FormControl(result['email']),
          lead_Status:new FormControl(result['lead_Status']),
          owner:new FormControl(result['owner']),
          no_Of_Employees:new FormControl(result['no_Of_Employees']),
          lead_Source:new FormControl(result['lead_Source']),
          address:new FormControl(result['address']),
          pincode:new FormControl(result['pincode']),
          country:new FormControl(result['country']),
          state:new FormControl(result['state']),
          city:new FormControl(result['city']),
          rating:new FormControl(result['rating']),
          assigned:new FormControl(result['owner']),
          subject:new FormControl(result['subject'])
        })
        this.editForm = this.fb.group({
          id : [''],
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
        this.taskService.getAllTasks().subscribe(
          (data: Tasks) => this.tasks =data,
          error => this.error=error
        );
        this.taskService.getTask(this.route.snapshot.params.id).subscribe((result)=>{
          this.editForm = new FormGroup({
            id: new FormControl(result['id']),
            subject: new FormControl(result['subject']),
            assigned: new FormControl(result['assigned']),
            date1: new FormControl(result['date1']),
            t_name: new FormControl(result['t_name']),
            comments: new FormControl(result['comments']),
            priority: new FormControl(result['priority']),
            status: new FormControl(result['status']),
            date2: new FormControl(result['date2']),
            time1: new FormControl(result['time1']),
          })
        })
            this.editForm= new FormGroup({
              id: new FormControl(result['id']),
              subject: new FormControl(result['subject']),
              assigned: new FormControl(result['assigned']),
              date1: new FormControl(result['date1']),
              t_name: new FormControl(result['t_name']),
              comments: new FormControl(result['comments']),
              priority: new FormControl(result['priority']),
              status: new FormControl(result['status']),
              date2: new FormControl(result['date2']),
              time1: new FormControl(result['time1']),
            })
        //console.log(result)rating
        this.editProfileForm = new FormGroup({
          plid: new FormControl(result['plid']),
          salutation:new FormControl(result['salutation']),
          first_Name:new FormControl(result['first_Name']),
          middle_Name:new FormControl(result['middle_Name']),
          last_Name:new FormControl(result['last_Name']),
          title:new FormControl(result['title']),
          company_Name:new FormControl(result['company_Name']),
          industry:new FormControl(result['industry']),
          phone_Number:new FormControl(result['phone_Number']),
          mobile_Number:new FormControl(result['mobile_Number']),
          email:new FormControl(result['email']),
          lead_Status:new FormControl(result['lead_Status']),
          owner:new FormControl(result['owner']),
          no_Of_Employees:new FormControl(result['no_Of_Employees']),
          lead_Source:new FormControl(result['lead_Source']),
          address:new FormControl(result['address']),
          pincode:new FormControl(result['pincode']),
          country:new FormControl(result['country']),
          state:new FormControl(result['state']),
          city:new FormControl(result['city']),
          rating:new FormControl(result['rating']),
          account_name:new FormControl(result['company_Name']),
          opportunity_name:new FormControl(result['company_Name']),
          account_Name:new FormControl(result['company_Name']),
          employee:new FormControl(result['no_Of_Employees']),
          lead_source:new FormControl(result['lead_Source']),
          account_owner:new FormControl(result['owner']),
          opportunity_owner:new FormControl(result['owner']),
          description:new FormControl(result['description']),
          type:new FormControl(result['type']),
          website:new FormControl(result['website']),
          parent_account:new FormControl(result['parent_account']),
        })
      })
    this.editProfileForm = this.formBuilder.group({
      account_name:['',Validators.required],
      industry:[''],
      phone_Number:['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
      account_owner:['',Validators.required],
      employee:[''],
      address:[''],
      pincode:['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(6)]],
      country:[''],
      state:[''],
      city:[''],
      description:[''],
      type:[''],
      website:[''],
      parent_account:['']
    });
    }
    reloadTask() {
      this.taskService.getAllTasks().subscribe(
        (data:Tasks)=> this.tasks=data,
        );
      }
      reloadcon() {
        this.ContactsService.getAllContacts().subscribe(
          (data:Contacts) => this.contacts=data,
          error=>this.error=error
        );
      }
    reloadacc() {
      this.accountService.getAllAccounts().subscribe(
        (data:Account) =>this.account= data,
        error=>this.error=error
      );
    }
    selectPolicy(account: Account){
      this.selectedPolicy = account;
    }
    selectPolicyc(contacts: Contacts){
      this.selectedPolicyc = contacts;
    }
      newleads(): void {
        this.nleads = new Leads();
      }
      reloadLead() {
        this.leadService.getAllLeads().subscribe(
          (data:Leads) =>this.leads= data,
          error=>this.error=error,
        ); 
      }
      reloadData1() {
        this.lead.getAllLeads().subscribe(
          (data:Leads) =>this.leads= data,
          error=>this.error=error
        );
      }
      createOrUpdatePolicy(id){
        this.taskService.UpdateTasks(id,this.selectedPolicy).subscribe(()=>{
        });
      }
      selectTask(tasks: Tasks){
      this.selectedTask = tasks;
    }
    selectLeads(leads: Leads){
      this.selectedLeads = leads;
    }
    onSubmit() {
      this.leadService.createLead(this.LeadForm.value)
        .subscribe(data => {
          console.log("Form Submitted!");
          this.LeadForm.reset();
        });
    }
    updateForm(data) {
      this.taskService.UpdateTasks(data.id, data).subscribe(()=>{
      });
    }
    onSubmit1() {
      this.updateForm(this.id);
    }
    onClickSubmit(data) {
      console.log(data.id);
      this.taskService.UpdateTasks(data.id, data).subscribe(()=>{
      });
    }
    Submitdata() {
      this.leadService.createLead(this.LeadForm.value)
        .subscribe(data => {
        });
    }
}
