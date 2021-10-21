import { Component, OnInit } from '@angular/core';
import { Opportunity} from "../../models/opportunity";
import { FormControl,FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService} from '../../servies/opportunity.service';
import { Tasks } from 'src/app/models/tasks';
import { TaskService } from 'src/app/servies/task.service';
import { HostListener } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-opportunity-split',
  templateUrl: './opportunity-split.component.html',
  styleUrls: ['./opportunity-split.component.css']
})
export class OpportunitySplitComponent implements OnInit {
  srcHeight:any;
srcWidth:any;
@HostListener('window:resize',['$event'])
getScreenSize(event?){
  this.srcWidth= window.innerWidth;
  console.log(this.srcWidth);
}
Present:boolean = true;
  isPresent:boolean = true;
  editProfileForm: FormGroup;
  opportunities:Opportunity;
  error: string;
  id:number;
  public show: boolean=false;
  public hide: boolean = true;
  public buttonName :any ='';
  opportunity = '';
  tutorials: any;
  public hide1 = 0;
  public n2;
  public n1;
  public n;
  public status ='';
  public loggedIn = false;
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
    subject:new FormControl(''),
    assigned:new FormControl(''),
    date1:new FormControl('')
  })
  tasks: any;
  constructor(private formBuilder: FormBuilder,private loginService: LoginService,
  private route: Router, private fb: FormBuilder,private modalService: NgbModal,
  private router: ActivatedRoute,private oppoService:OpportunityService, public taskService: TaskService,
){  this.getScreenSize();}


  addForm: FormGroup;

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    this.opportunities = new Opportunity();

    this.retrieveTutorials();

    console.log(this.router.snapshot.params.id);
    this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
      this.editForm = new FormGroup({
        id : new FormControl(result['id']),
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
        assigned:new FormControl(result['assigned']),
        subject:new FormControl(result['subject']),
        date1:new FormControl(result['date1'])
      })

    })


    this.retrieveTutorials();
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
    });
  };

  upcontacts(id: number){
    this.route.navigate(['/contacts-status',id]);
  }

  openMod(targetModal, opportunity) {
    this.modalService.open(targetModal, {size: 'lg',
    centered: true,
    backdrop: 'static'
  });
  this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
    this.editProfileForm.patchValue({
      id: opportunity.id,
      opportunity: opportunity.opportunity,
        opportunity_owner: opportunity.opportunity_owner,
        type: opportunity.type,
        primary_csource: opportunity.primary_csource,
        budget_confirmed: opportunity.budget_confirmed,
        close_date: opportunity.close_date,
        account_name: opportunity.account_name,
        next_step: opportunity.next_step,
        lead_source: opportunity.lead_source,
        probability: opportunity.probability,
        roi_Analysis_Completed: opportunity.roi_Analysis_Completed,
        discovery_Completed: opportunity.discovery_Completed,
        stage: opportunity.stage,
        amount: opportunity.amount,
        description: opportunity.description,
        loss_reason: opportunity.loss_reason,
      
    });
  })

  }

  onSubmit() {
    this.updateForm(this.id);
  }
  
  reloadData() {
    this.oppoService.getAllOppo().subscribe(
      (data:Opportunity) => this.opportunities=data,
      error=>this.error=error
    );
  }
  newtasks(): void {
    this.tasks = new Tasks();
  }
  newTast()
  {
    this.taskService.createTask(this.editForm.value).subscribe(data => {
      console.log("Submitted");})
  }
  createOrUpdatePolicy(id){
    this.oppoService.updateOpportunity(id,this.selectedPolicy).subscribe(()=>{

    });
  }

  onToggleDivSizeChange(){
    const element = document.getElementById('xyz');
    if(this.Present){
      element.style.height ="1270px";
      this.Present = false;
    }else{
      element.style.height ="1030px";
      this.Present = true;
    }
    if(this.srcWidth==1024)
    {
      if(this.isPresent){

        element.style.height ="1350px";
        this.isPresent = false;
      }
      else{
        element.style.height ="1050px";
        this.isPresent = true;
      }
    }
  }

  unqualifiedStatus(data)
  {
    
    this.n1=this.editForm.value.stage;
    var n1 = this.n1;
    if(this.n1>1){
      this.n = this.n1-1;
      data['stage']=this.n1-this.n;
      console.log(data['stage']);
      this.onClickSubmit(data);
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
      this.onClickSubmit(data);
    }
    else{
    
      data['stage']=2;
      console.log(data['stage']);
      this.onClickSubmit(data);      
      
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
      this.onClickSubmit(data);

    }
    else{
      data['stage']=3;
      console.log(data['stage']);
      this.onClickSubmit(data);      

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
      this.onClickSubmit(data);

    }
    else{
      data['stage']=4;
      console.log(data['stage']);
      this.onClickSubmit(data);
    }
  }

  selectPolicy(opportunity: Opportunity){
    this.selectedPolicy = opportunity;
    console.log(this.selectedPolicy);
  }

  updateForm(id) {
    this.oppoService.updateOpportunity(id, this.selectedPolicy).subscribe(()=>{
    });
  }
  
  Update(id){
    this.oppoService.updateOpportunity(id, this.selectedPolicy).subscribe(()=>{
     });
   }

   onClickSubmit(data) {

    this.oppoService.updateOpportunity(data.id, data).subscribe(()=>{
      
    });
    
  }
  deleteOpportunity(data) {
    this.oppoService.deleteOpportunity(data)
    .subscribe(
      data => {
        this.route.navigate(['view']);
      },
      error=>console.log(error));
  }

  toggle(opportunity: Opportunity){
    if(this.hide1==0){
      this.selectedPolicy=opportunity;
      this.changeStatus(this.editForm.value)
      this.show=!this.show;
      this.hide = !this.hide;
      if(this.show)
      {
        this.buttonName = "";
        this.changeStatus(this.editForm.value)
      }
      else (this.hide)
        this.buttonName = "";
        this.hide1=this.hide1+1;
      }
    else(this.hide1=1)
    this.selectedPolicy=opportunity;
    this.changeStatus(this.editForm.value)

  }


  retrieveTutorials() {
    this.oppoService.getAllOppo()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchOpportunity() {
    this.oppoService.findByOpportunity(this.opportunity)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  public toggleColor(data)
  {
        console.log(data); 
    this.oppoService.getOpportunityById(this.router.snapshot.params.id).subscribe((result)=>{
      
      console.log("data",result);
      this.n1=result['stage'];
      console.log(this.n1);

       var n1=this.n1;
         if(this.n1==1){
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
        if(this.n1==1){
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
 
}
);
}
}