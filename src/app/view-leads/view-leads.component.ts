import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from "../lead.service";
import { Leads } from "../leads";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.css']
})
export class ViewLeadsComponent implements OnInit {

  editProfileForm: FormGroup;
  LeadForm: FormGroup;
  plid: number;
  leads:Leads;
  lead: Leads;
  error:string;
  countries: {};
  states: {};
  cities: {};
public loggedIn = false;
  nleads: Leads = new Leads();


  selectedPolicy:  Leads  = { plid: null,
    salutation: null,
  first_Name: null,
  middle_Name: null,
  last_Name: null,
  title: null,
  company: null,
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
  rating: null,
  creationDate: null
};
  obj: number;

  constructor(private formBuilder: FormBuilder,private alertmsg: AlertService,private loginService: LoginService,
    private route:Router,private fb: FormBuilder,private modalService: NgbModal,private router:ActivatedRoute,
    private leadService:LeadService, private apiService: ApiService) {}
  
    addForm: FormGroup;

    ngOnInit() {
      this.getAllCountries();
      this.loggedIn=this.loginService.isLoggedIn();
      this.LeadForm = this.formBuilder.group({
        salutation: [''],
        first_Name: ['', Validators.required],
        middle_Name: [''],
        last_Name: ['', Validators.required],
        title: [''],
        company: ['', Validators.required],
        industry: [''],
        phone_Number: [''],
        mobile_Number: [''],
        email: [''],
        lead_Status: [''],
        owner: [''],
        no_Of_Employees: [''],
        lead_Source: [''],
        address: [''],
        pincode: [''],
        country: [''],
        state: [''],
        city: [''],
        rating: ['']
      });

      this.lead = new Leads();

      this.reloadData();
      this.addForm = this.formBuilder.group({
        salutation:[''],
        first_Name:['', Validators.required],
        middle_Name:[''],
        last_Name:['', Validators.required],
        title:[''],
        company:['', Validators.required],
        industry:[''],
        phone_Number:[''],
        mobile_Number:[''],
        email:[''],
        lead_Status:[''],
        owner:[''],
        no_Of_Employees:[''],
        lead_Source:[''],
        address:[''], 
        pincode:[''],
        country:[''],
        state:[''],
        city:[''],
        rating:['']
      });
      

      this.editProfileForm = this.fb.group({
        plid:[''],
        salutation:[''],
        first_Name:[''],
        middle_Name:[''],
        last_Name:[''],
        title:[''],
        company:[''],
        industry:[''],
        phone_Number:[''],
        mobile_Number:[''],
        email:[''],
        lead_Status:[''],
        owner:[''],
        no_Of_Employees:[''],
        lead_Source:[''],
        address:[''],
        pincode:[''],
        country:[''],
        state:[''],
        city:[''],
        rating:['']        
       });
    }


    getAllCountries(){
      this.apiService.getAllCountries().subscribe(
        data => this.countries = data
      );
    }

    getState(event){
      var obj = {
        countryId: event
      }; 
      this.apiService.getStateByCountryId(event).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    }
    getCity(event){
      if (event) {
        this.apiService.getCityByStateId(event).subscribe(
          data => this.cities = data
        );
      } else {
        this.cities = null;
      }
    
    }
    newleads(): void {
      this.nleads = new Leads();
    }

    refresh(): void {
      window.location.reload();
  }
  
    selectPolicy(leads: Leads){
      this.selectedPolicy = leads;
      if(this.selectedPolicy.country){
        this.getState(this.selectedPolicy.country);
      }
      if(this.selectedPolicy.state){
        this.getCity(this.selectedPolicy.state);
      }
    }
  
    Update(plid){
       this.leadService.UpdateLeads(plid, this.selectedPolicy).subscribe(()=>{
         this.updateMsg();
        });
      }
      
    reloadData() {
      this.leadService.getAllLeads().subscribe(
        (data:Leads) =>this.leads= data,
        error=>this.error=error
      );
    }

    deleteLeads(plid: number) {
      // alert("are you sure");
      this.leadService.deleteleads(plid)
        .subscribe(
          data => {
            this.refresh();
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
          

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

    upplead(plid: number, leads) {
      this.ngOnInit();
      this.route.navigate(['/lead-status',plid]);
  
    }

    onSubmit() {
      this.leadService.createLead(this.LeadForm.value)
        .subscribe(data => {
          console.log("Form Submitted!");
          this.LeadForm.reset();
          
        });
    }
  
  
    Submitdata() {
      this.leadService.createLead(this.LeadForm.value)
        .subscribe(data => {
          

        });
    }
  
    updateMsg(){
      this.alertmsg.showSuccess("Data Updated Successfully !!", "Passogen Technology");
    }
    
    ErrorMsg(){
      this.alertmsg.showError("Error While Updating Data !!", "Passogen Technology");
    }
}
