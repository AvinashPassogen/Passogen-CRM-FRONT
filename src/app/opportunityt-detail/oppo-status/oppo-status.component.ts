import { Component, OnInit } from '@angular/core';
import { Opportunity} from "../../models/opportunity";
import { FormGroup, FormBuilder,FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService } from '../../servies/opportunity.service';
import { TaskService } from 'src/app/servies/task.service';
import { Tasks } from 'src/app/models/tasks';
import { Sales } from 'src/app/models/sales';
import { DatePipe } from '@angular/common'
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-oppo-status',
  templateUrl: './oppo-status.component.html',
  styleUrls: ['./oppo-status.component.css']
})
export class OppoStatusComponent implements OnInit
 {
   firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  editProfileForm: FormGroup;
  opportunity:Opportunity;
  sales: Sales = new Sales();
  error: string;
  id:number;
  public n1;
  public n;
  public status ='';
  tasks: Tasks = new Tasks();
  public month;
  public total_sales;
  public show: boolean=false;
  public buttonName :any ='';
  public myColor:string = 'blue';
  selectedPolicy : Opportunity = {
    id: null,
    opportunity: null,
    opportunity_owner: null,
    type: null,
    primary_csource: null,
    budget_confirmed: null,
    close_date: null,
    account_name: null,
    next_step: null,
    lead_source: null,
    probability: null,
    roi_Analysis_Completed: null,
    discovery_Completed: null,
    stage: null,
    amount: null,
    description: null,
  //  status: null,
    loss_reason: null,
  };

  editForm = new FormGroup({
    id: new FormControl(''),
    opportunity: new FormControl(''),
    opportunity_owner: new FormControl(''),
    type: new FormControl(''),
    primary_csource: new FormControl(''),
    budget_confirmed: new FormControl(''),
    close_date: new FormControl(''),
    account_name: new FormControl(''),
    next_step: new FormControl(''),
    lead_source: new FormControl(''),
    probability: new FormControl(''),
    roi_Analysis_Completed: new FormControl(''),
    discovery_Completed: new FormControl(''),
    stage: new FormControl(''),
    amount: new FormControl(''),
    description: new FormControl(''),
    loss_reason: new FormControl(''),
    status: new FormControl(''),
    subject:new FormControl(''),
    assigned:new FormControl(''),
    date1: new FormControl('')

  })

  constructor(private formBuilder: FormBuilder,private taskService:TaskService,public datepipe: DatePipe,
  private route: Router, private fb: FormBuilder,private modalService: NgbModal,private alertmsg: AlertService,
  private router: ActivatedRoute, private oppoService: OpportunityService, private loginService: LoginService
  )
  { }

  addForm: FormGroup;

  ngOnInit(): void {
    this.opportunity = new Opportunity();
    
    this.changeStatus(this.editForm.value);

        this.reloadData();
        this.addForm = this.formBuilder.group({
          
          id: [''],
          opportunity: [''],
          opportunity_owner: [''],
          type: [''],
          primary_csource: [''],
          budget_confirmed: [''],
          close_date: [''],
          account_name: [''],
          next_step: [''],
          lead_source: [''],
          probability: [''],
          roi_Analysis_Completed: [''],
          discovery_Completed: [''],
          stage: [''],
          amount: [''],
          description: [''],
          loss_reason: [''],
          status:[''],
        });
    
        this.editProfileForm = this.fb.group({
          
          id: [''],
          opportunity: [''],
          opportunity_owner: [''],
          type: [''],
          primary_csource: [''],
          budget_confirmed: [''],
          close_date: [''],
          account_name: [''],
          next_step: [''],
          lead_source: [''],
          probability: [''],
          roi_Analysis_Completed: [''],
          discovery_Completed: [''],
          stage: [''],
          amount: [''],
          description: [''],
          loss_reason: [''],
          status: [''],
        });
    

        this.oppoService.getAllOppo().subscribe(
          (data: Opportunity) => this.opportunity =data,
          error => this.error=error
        );


        console.log(this.router.snapshot.params.id);
        this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
          this.editForm = new FormGroup({
            id: new FormControl(result['id']),
            opportunity: new FormControl(result['opportunity']),
            opportunity_owner: new FormControl(result['opportunity_owner']),
            type: new FormControl(result['type']),
            primary_csource: new FormControl(result['primary_csource']),
            budget_confirmed: new FormControl(result['budget_confirmed']),
            close_date: new FormControl(result['close_date']),
            account_name: new FormControl(result['account_name']),
            next_step: new FormControl(result['next_step']),
            lead_source: new FormControl(result['lead_source']),
            probability: new FormControl(result['probability']),
            roi_Analysis_Completed: new FormControl(result['roi_Analysis_Completed']),
            discovery_Completed: new FormControl(result['discovery_Completed']),
            stage: new FormControl(result['stage']),
            amount: new FormControl(result['amount']),
            description: new FormControl(result['description']),
            loss_reason: new FormControl(result['loss_reason']),
            status: new FormControl(result['status']),
            subject:new FormControl(result['subject']),
            assigned: new FormControl(result['assigned']),
            date1: new FormControl(result['date1'])
          })
    
    })
  };

  uptasks(id: number,task){
    this.ngOnInit();
    this.route.navigate(['/tasks-status',id]);
  }

  openMod(targetModal, opportunity) {
    this.modalService.open(targetModal, {size: 'lg',
    centered: true,
    backdrop: 'static'
  });

  this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
    this.editProfileForm.patchValue({
      id:opportunity.id,
      opportunity:opportunity.opportunity,
      opportunity_owner:opportunity.opportunity_owner,
      type:opportunity.opportunity.type,
      primary_csource:opportunity.primary_csource,
      budget_confirmed:opportunity.budget_confirmed,
      close_date:opportunity.close_date,
      account_name:opportunity.account_name,
      next_step:opportunity.next_step,
      lead_source:opportunity.lead_source,
      probability:opportunity.probability,
      roi_Analysis_Completed:opportunity.roi_Analysis_Completed,
      discovery_Completed:opportunity.discovery_Completed,
      stage:opportunity.stage,
      amount:opportunity.amount,
      description:opportunity.description,
      loss_reason:opportunity.loss_reason,
      status:opportunity.status,
    });
  })

  }
  onSubmit() {
    this.updateForm(this.id);
  }

  reloadData() {
    this.oppoService.getAllOppo().subscribe(
      (data:Opportunity) => this.opportunity=data,
      error=>this.error=error
    );
  }

 
  createOrUpdatePolicy(id){
    this.oppoService.updateOpportunity(id,this.selectedPolicy).subscribe(()=>{

    });
  }

  onClickSubmit(data) {
    console.log("fun",data);
    this.oppoService.updateOpportunity(data.id, data).subscribe(()=>{
      this.updateMsg();
    });
    
  }
  update(data) {
    console.log("fun",data);
    this.oppoService.updateOpportunity(data.id, data).subscribe(()=>{
    });
    
  }
  unqualifiedStatus(data)
  {
    
    this.n1=this.editForm.value.stage;
    var n1 = this.n1;
    if(this.n1>1){
      this.n = this.n1-1;
      data['stage']=this.n1-this.n;
      console.log(data['stage']);
      this.update(data);
    }
  }

  newStatus(data)
  {
    
    this.n1=this.editForm.value.stage;
    var n1 = this.n1;
    if(this.n1>2){
      this.n = this.n1-2;
      data['stage']=this.n1-this.n;
      console.log(data['stage']);
      this.update(data);
    }
    else{
    
      data['stage']=2;
      console.log(data['stage']);
      this.update(data);      
      
    }
  }

  workingStatus(data)
  {
    
    this.n1=this.editForm.value.stage;
    var n1 = this.n1;
    if(this.n1>3){
      this.n = this.n1-3;
      data['stage']=this.n1-this.n;
      console.log(data['stage']);
      this.update(data);

    }
    else{
      data['stage']=3;
      console.log(data['stage']);
      this.update(data);      

    }
  }

  nurturingStatus(data)
  {
    
    this.n1=this.editForm.value.stage;
    var n1 = this.n1;
    if(this.n1>4){
      this.n = this.n1-4;
      data['stage']=this.n1-this.n;
      console.log(data['stage']);
      this.update(data);

    }
    else{
      data['stage']=4;
      console.log(data['stage']);
      this.update(data);
    }
  }


  newtasks(): void {
    this.tasks = new Tasks();
  }
  newTast()
  {
    this.taskService.createTask(this.editForm.value).subscribe(data => {
      this.TaskMsg();
    })
  }

  UpdateOppo(data){
    console.log(data.id);
    this.oppoService.updateOpportunity(data.id, data).subscribe(()=>{
     });
   }

  selectPolicy(opportunity: Opportunity){
    this.selectedPolicy = opportunity;
  }

  updateForm(id) {
    this.oppoService.updateOpportunity(id, this.selectedPolicy).subscribe(()=>{
    });
  }
   
  Update(data){
    this.oppoService.updateOpportunity(data.id, data).subscribe(()=>{
     });
   }
   refresh(): void {
    window.location.reload();
   }

   convert(data){
     if(this.editForm.value.stage == 5){
      const dateTime =this.editForm.value.close_date;
      const parts = dateTime.split(/[- :]/);
      var month = parts[1];
      var year = parts[0];
      const d = new Date();
      d.setMonth(month-1);
      const monthName = d.toLocaleString("default", {month: "long"});
      this.sales.month = monthName;
      this.sales.totalSales = this.editForm.value.amount;
      
      this.oppoService.Totalsales(this.sales).subscribe(()=>{
      },
      error=>{
        this.updateMsgs();
      }
      
      )
      this.Update(data);
     }
   }

   getMonthName(month){
    const d = new Date();
    d.setMonth(month-1);
    const monthName = d.toLocaleString("default", {month: "long"});
    console.log(monthName)
  }

  toggle(opportunity:Opportunity){
    this.selectedPolicy=opportunity;
    this.show=!this.show;
    if(this.show)
      this.buttonName = "";
    else
      this.buttonName = "";
  }


  deleteOpportunity(data) {
    this.oppoService.deleteOpportunity(data.id)
    .subscribe(
      data => {
        console.log(data);
        
        this.route.navigate(['/Opportunity-view']);

      },
      error => console.log(error));
  }
 
  public toggleColor(data)
  {
        console.log(data); 
    this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
      
      console.log("data",result);
      this.n1=result['stage'];
      console.log(this.n1);

       var n1=this.n1;
         if(this.n1==0){
          data['stage']=++n1;

          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('negotiation').style.backgroundColor = "#3C69C9";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

           this.onClickSubmit(data);
          
         }
         else if(this.n1==1){
          data['stage']=++n1;

          console.log(data['stage']);
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('negotiation').style.backgroundColor = "#3C69C9";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";
          
           this.onClickSubmit(data);
          
         }
         else if(this.n1==2){
          data['stage']=++n1;

          console.log("gfdsfghfdsf",data['stage']);
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('negotiation').style.backgroundColor = "#3C69C9";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";
           
           this.onClickSubmit(data);
           
         }
        else if(this.n1==3){
          data['stage']=++n1;

          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
          document.getElementById('negotiation').style.backgroundColor = "#3C69C9";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

           this.onClickSubmit(data);
            
        }
         else if(this.n1==4){
          data['stage']=++n1;

          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
          document.getElementById('negotiation').style.backgroundColor = "#689f38";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";
         this.onClickSubmit(data);
         
}
          else if(this.n1==5){
            document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
            document.getElementById('negotiation').style.backgroundColor = "#689f38";
            document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

            
            console.log(n1,data);
            this.onClickSubmit(data);
          
          }

          else if(this.n1==6){
            document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
            document.getElementById('negotiation').style.backgroundColor = "#689f38";
            document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

            
            console.log(n1,data);
            this.onClickSubmit(data);
          
          }
 
}
);
}

public changeStatus(data)
  {
        console.log(data); 
    this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
      
      console.log("data",result);
      this.n1=result['stage'];
      console.log(this.n1);

       var n1=this.n1;
         if(this.n1==0){
              
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
           
           data['stage']=++n1;
           console.log(n1,data);
           this.onClickSubmit(data);
          
         }
         else if(this.n1==1){
          
          console.log(data['stage']);
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#3C69C9";

          
           data['stage']=++n1;
           console.log(n1,data);
           this.onClickSubmit(data);
          
         }
         else if(this.n1==2){
          
          console.log("gfdsfghfdsf",data['stage']);
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
          
           data['stage']=++n1;
           console.log(n1,data);
           this.onClickSubmit(data);
           
         }
        else if(this.n1==3){
          
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
          document.getElementById('negotiation').style.backgroundColor = "#3C69C9";
          
           data['stage']=++n1;
           console.log(n1,data);
           this.onClickSubmit(data);
            
          }
         else if(this.n1==4){
          
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
          document.getElementById('negotiation').style.backgroundColor = "#689f38";
          document.getElementById('close_lost').style.backgroundColor = "#3C69C9";
          data['stage']=++n1;
          console.log(n1,data);
          this.onClickSubmit(data);
         
          }
          else if(this.n1==5){
            
            document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
            document.getElementById('negotiation').style.backgroundColor = "#689f38";
            document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

            
            console.log(n1,data);
            this.onClickSubmit(data);
          
          }
          else if(this.n1==6){
            document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
            document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
            document.getElementById('negotiation').style.backgroundColor = "#689f38";
            document.getElementById('close_lost').style.backgroundColor = "#3C69C9";

            
            console.log(n1,data);
            this.onClickSubmit(data);

          }
 
}
);
}

updateMsg(){
  this.alertmsg.showSuccess("Status Change Successfully !!", "Passogen Technology");
}

updateMsgs(){
  this.alertmsg.showSuccess("Data Update Successfully !!", "Passogen Technology");
}

TaskMsg(){
  this.alertmsg.showSuccess("Task Assign Successfully!!", "Passogen Technology");
}

ErrorMsg(){
  this.alertmsg.showError("Username or Password is not valid", "Passogen Technology");
}
}
