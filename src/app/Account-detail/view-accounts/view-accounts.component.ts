import { Component, OnInit } from '@angular/core';
import { Account} from "../../models/account";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../servies/account.service';
import { ApiService } from 'src/app/api.service';
import { AlertService } from 'src/app/services/alert.service';
declare var $: any;
@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit {
  editProfileForm: FormGroup;
  id: number;
  account:Account;
  error:string;
  countries: {};
  states: {};
  cities: {};
  selectedPolicy:  Account  = { 
    id: null,
    name: null,
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
 constructor(
    private formBuilder: FormBuilder,
    private route:Router,private alertmsg: AlertService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router:ActivatedRoute,private apiService: ApiService,
    private accountService:AccountService) { }
    submitted = false;
    get a() { return this.editProfileForm.controls; }
    ngOnInit(): void {

      this.getAllCountries();

      this.account = new Account();
      this.reloadData();
      this.editProfileForm = this.formBuilder.group({
        name:['',Validators.required],
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
    reloadData() {
      this.accountService.getAllAccounts().subscribe(
        (data:Account) =>this.account= data,
        error=>this.error=error
      );
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

    deleteAccount(id: number) {
      this.accountService.deleteAccount(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
    refresh(): void {
      window.location.reload();
     }
    selectPolicy(account: Account){
      this.selectedPolicy = account;
      if(this.selectedPolicy.country){
        this.getState(this.selectedPolicy.country);
      }
      if(this.selectedPolicy.state){
        this.getCity(this.selectedPolicy.state);
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
    Update(id){
      this.submitted = true;
      // stop here if form is invalid
      if (this.editProfileForm.invalid) {
          return;
      }
      //True if all the fields are filled
      if(this.submitted)
      {
        this.accountService.updateAccount(id, this.selectedPolicy).subscribe(()=>{
          this.updateMsg();
        });
        $("#modal").modal("hide");
      }
     }

     updateMsg(){
      this.alertmsg.showSuccess("Data Updated Successfully !!", "Passogen Technology");
    }
    
    ErrorMsg(){
      this.alertmsg.showError("Error While Updating Data !!", "Passogen Technology");
    }
}
