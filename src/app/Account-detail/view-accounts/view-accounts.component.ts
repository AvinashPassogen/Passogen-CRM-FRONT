import { Component, OnInit } from '@angular/core';
import { Account} from "../../models/account";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../servies/account.service';
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
 constructor(
    private formBuilder: FormBuilder,
    private route:Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router:ActivatedRoute,
    private accountService:AccountService) { }
    submitted = false;
    get a() { return this.editProfileForm.controls; }
    ngOnInit(): void {
      this.account = new Account();
      this.reloadData();
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
    reloadData() {
      this.accountService.getAllAccounts().subscribe(
        (data:Account) =>this.account= data,
        error=>this.error=error
      );
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
        });
        this.refresh();
        $("#modal").modal("hide");
      }
     }
     resetForm()
     {
      this.editProfileForm.reset();
     }
}
