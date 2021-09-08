import { Component, OnInit } from '@angular/core';
import { Account} from "../../models/account";
import { FormControl,FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../servies/account.service';
import { TaskService } from 'src/app/servies/task.service';
import { Tasks } from 'src/app/models/tasks';


@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.css']
})
export class AccountStatusComponent implements OnInit {

  editProfileForm: FormGroup;
  accounts:Account;
  account:Account;
  error: string;
  id:number;
  public show: boolean=false;
  public buttonName :any ='';

  selectedPolicy : Account = {
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

  editForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    account_owner: new FormControl(''),
	  type: new FormControl(''),
	  website: new FormControl(''),
	  parent_account: new FormControl(''),
	  description: new FormControl(''),
    industry: new FormControl(''),
    phone_Number: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    employee: new FormControl(''),
    subject:new FormControl(''), 
    date1:new FormControl(''),
    date2:new FormControl(''),
    time1:new FormControl(''),
    assigned:new FormControl(''),
    comments: new FormControl(''),
    middle_Name:new FormControl(''),
  })
  tasks: any;

  constructor (
    private formBuilder: FormBuilder,
    private route: Router, 
    private fb: FormBuilder,
    public taskService: TaskService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private accountService: AccountService  ){}
  

    addForm: FormGroup;

    ngOnInit() {
      this.accountService.getAllAccounts().subscribe(
        (data: Account) => this.accounts =data,
        error => this.error=error
      );
  
      this.accounts = new Account();
  
      this.reloadData();
      this.addForm = this.formBuilder.group({
        id: [''],
        name: [''],
        account_owner: [''],
        type: [''],
        website: [''],
        Parent_account: [''],
        description: [''],
        industry: [''],
        phone_Number: [''],
        address: [''],
        pincode: [''],
        country: [''],
        state: [''],
        city: [''],
        employee: [''],
      });
  
      this.editProfileForm = this.fb.group({
        id: [''],
        name: [''],
        account_owner: [''],
        type: [''],
        website: [''],
        Parent_account: [''],
        description: [''],
        industry: [''],
        phone_Number: [''],
        address: [''],
        pincode: [''],
        country: [''],
        state: [''],
        city: [''],
        employee: [''],
      });
        
      console.log(this.router.snapshot.params.id);
      this.accountService.getAccount(this.router.snapshot.params.id).subscribe((result)=>{
  
        this.editForm = new FormGroup({
          id: new FormControl(result['id']),
          name: new FormControl(result['name']),
          account_owner: new FormControl(result['account_owner']),
          type: new FormControl(result['type']),
          website: new FormControl(result['website']),
          parent_account: new FormControl(result['parent_account']),
          description: new FormControl(result['description']),
          industry: new FormControl(result['industry']),
          phone_Number: new FormControl(result['phone_Number']),
          address: new FormControl(result['address']),
          pincode: new FormControl(result['pincode']),
          country: new FormControl(result['country']),
          state: new FormControl(result['state']),
          city: new FormControl(result['city']),
          employee: new FormControl(result['employee']),
          assigned:new FormControl(result['assigned']),
          subject:new FormControl(result['subject']),
          date1:new FormControl(result['date1']),
          date2:new FormControl(result['date2']),
          time1:new FormControl(result['time1']),
          comments:new FormControl(result['comments'])
        })
  
      })
    };
  
    upcontacts(id: number){
      this.route.navigate(['/contacts-status',id]);
    }
  
    openMod(targetModal, accounts) {
      this.modalService.open(targetModal, {size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    this.accountService.getAccount(this.router.snapshot.params.id).subscribe((result)=>{
      this.editProfileForm.patchValue({
        id: accounts.id,
        name: accounts.name,
          account_owner: accounts.account_owner,
          type: accounts.type,
          website: accounts.website,
          Parent_account: accounts.Parent_account,
          description: accounts.description,
          industry: accounts.industry,
          phone_Number: accounts.phone_Number,
          address: accounts.address,
          pincode: accounts.pincode,
          country: accounts.country,
          state: accounts.state,
          city: accounts.city,
          employee: accounts.employee,
      });
    })
  
    }
  
    onSubmit() {
      this.updateForm(this.id);
    }
  
    reloadData() {
      this.accountService.getAllAccounts().subscribe(
        (data:Account) => this.accounts=data,
        error=>this.error=error
      );
    }
  
    createOrUpdatePolicy(id){
      this.accountService.updateAccount(id,this.selectedPolicy).subscribe(()=>{
  
      });
    }
    newtasks(): void {
      this.tasks = new Tasks();
    }
    newTast()
    {
      this.taskService.createTask(this.editForm.value).subscribe(data => {
        console.log("Submitted");})
    }
  
    selectPolicy(accounts: Account){
      this.selectedPolicy = accounts;
    }
  
    updateForm(id) {
      this.accountService.updateAccount(id, this.selectedPolicy).subscribe(()=>{
      });
    }
    
    onClickSubmit(data) {
    
      this.accountService.updateAccount(data.id,data).subscribe(()=>{
      });
    }
  
    toggle(accounts:Account){
      this.selectedPolicy=accounts;
      this.show=!this.show;
      if(this.show)
        this.buttonName = "";
      else
        this.buttonName = "";
    }
    deleteAccount(data) {
      this.accountService.deleteAccount(data.id)
        .subscribe(
          data => {
            this.route.navigate(['/Account-view']);

          },
          error => console.log(error));
    }


}
