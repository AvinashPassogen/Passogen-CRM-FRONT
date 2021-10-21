import { Component, OnInit } from '@angular/core';
import { Opportunity} from "../../models/opportunity";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService } from '../../servies/opportunity.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/login.service';


@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.css']
})
export class ViewOpportunityComponent implements OnInit {

 
  opportunityForm: FormGroup;
  editProfileForm: FormGroup;

  id: number;
  opportunities:Opportunity;
  opportunity:Opportunity;
  error:string;
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

 constructor(
    private formBuilder: FormBuilder,
    private route:Router,private alertmsg: AlertService,
    private fb: FormBuilder,private loginService: LoginService,
    private modalService: NgbModal,
    private router:ActivatedRoute,
    private oppoService:OpportunityService) { }


    ngOnInit(): void {
      this.opportunity = new Opportunity();
      this.loggedIn = this.loginService.isLoggedIn(); 
      this.reloadData();
      this.opportunityForm = this.formBuilder.group({
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
        ROI_Analysis_Completed: [''],
        discovery_Completed: [''],
        stage: [''],
        amount: [''],
        description: [''],
        loss_reason: [''],
      });

      this.editProfileForm = this.formBuilder.group({
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
        ROI_Analysis_Completed: [''],
        discovery_Completed: [''],
        stage: [''],
        amount: [''],
        description: [''],
        loss_reason: [''],
      });
      
    }

    reloadData() {
      this.oppoService.getAllOppo().subscribe(
        (data:Opportunity) =>this.opportunities= data,
        error=>this.error=error
        
      );
    }



    deleteOpportunity(id: number) {
      this.oppoService.deleteOpportunity(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
          
        },
        error => console.log(error));
    }

    selectPolicy(opportunity: Opportunity){
      this.selectedPolicy = opportunity;
    }
    Update(id){
      this.oppoService.updateOpportunity(id, this.selectedPolicy).subscribe(()=>{
        this.updateMsgs();
       });
     }
   
     updateMsgs(){
      this.alertmsg.showSuccess("Data Update Successfully !!", "Passogen Technology");
    }

}
