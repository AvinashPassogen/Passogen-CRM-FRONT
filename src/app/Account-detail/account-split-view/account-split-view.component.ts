import { Component, OnInit } from '@angular/core';
import { Account } from "../../models/account";
import { FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../servies/account.service';
import { TaskService } from 'src/app/servies/task.service';
import { Tasks } from 'src/app/models/tasks';


@Component({
  selector: 'app-account-split-view',
  templateUrl: './account-split-view.component.html',
  styleUrls: ['./account-split-view.component.css']
})
export class AccountSplitViewComponent implements OnInit {

  editProfileForm: FormGroup;
  accounts: Account;
  account: Account;
  error: string;
  id: number;
  name ='';
  tutorials: any;
  public show: boolean = false;
  public hide: boolean=  true;
  public buttonName: any = '';


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
	  Parent_account: new FormControl(''),
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
    assigned:new FormControl(''),
    date1:new FormControl('')
  })
  tasks: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    public taskService: TaskService,
    private accountService: AccountService) { }


  addForm: FormGroup;

  ngOnInit() {
    this.retrieveTutorials();
    console.log(this.router.snapshot.params.id);
    this.accountService.getAccount(this.router.snapshot.params.id).subscribe((result) => {
      this.editForm = new FormGroup({
        id: new FormControl(result['id']),
          name: new FormControl(result['name']),
          account_owner: new FormControl(result['account_owner']),
          type: new FormControl(result['type']),
          website: new FormControl(result['website']),
          Parent_account: new FormControl(result['Parent_account']),
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
        date1:new FormControl(result['date1'])
      })
      // console.log(result)

    })
  };

  selectPolicy(accounts: Account) {
    this.selectedPolicy = accounts;
  }


  toggle(accounts: Account) {
    this.selectedPolicy = accounts;
    this.show = !this.show;
    this.hide = !this.hide;
    if (this.show)
      this.buttonName = "";
    else(this.hide)
      this.buttonName = "";
  }

  retrieveTutorials() {
    this.accountService.getAllAccounts()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
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
  searchTitle() {
    this.accountService.findByAccount(this.name)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  deleteLeads(id: number) {
    // alert("are you sure");
    this.accountService.deleteAccount(id)
      .subscribe(
        data => {
        },

  );}

  Update(id){
    this.accountService.updateAccount(id, this.selectedPolicy).subscribe(()=>{
     });
   }

  createOrUpdatePolicy(id){
    this.accountService.updateAccount(id, this.selectedPolicy).subscribe(()=>{
     });
   }
   onClickSubmit(data)
   {
    this.accountService.updateAccount(data.id, data).subscribe(()=>{
    });
   }

}
 