import { Component, OnInit } from '@angular/core';
import { Opportunity} from "../../models/opportunity";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService } from '../../servies/opportunity.service';


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

  selectedPolicy : Opportunity = {
    id: null,
    opportunity_name: null,
    opportunity_owner: null,
    type: null,
    primary_csource: null,
    budget_confirmed: null,
    close_date: null,
    account_name: null,
    next_step: null,
    lead_source: null,
    probability: null,
    roi_analysis_completed: null,
    discovery_completed: null,
    stage: null,
    amount: null,
    description: null,
    loss_reason: null,
  };

 constructor(
    private formBuilder: FormBuilder,
    private route:Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router:ActivatedRoute,
    private oppoService:OpportunityService) { }


    ngOnInit(): void {
      this.opportunity = new Opportunity();

      this.reloadData();
      this.opportunityForm = this.formBuilder.group({
        opportunity_name: [''],
        opportunity_owner: [''],
        type: [''],
        primary_csource: [''],
        budget_confirmed: [''],
        close_date: [''],
        account_name: [''],
        next_step: [''],
        lead_source: [''],
        probability: [''],
        roi_analysis_completed: [''],
        discovery_completed: [''],
        stage: [''],
        amount: [''],
        description: [''],
        loss_reason: [''],
      });

      this.editProfileForm = this.formBuilder.group({
        opportunity_name: [''],
        opportunity_owner: [''],
        type: [''],
        primary_csource: [''],
        budget_confirmed: [''],
        close_date: [''],
        account_name: [''],
        next_step: [''],
        lead_source: [''],
        probability: [''],
        roi_analysis_completed: [''],
        discovery_completed: [''],
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
       });
     }
   

}
