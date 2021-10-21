import { Component, OnInit } from '@angular/core';
import { Contacts} from "../../models/contacts";
import { FormControl,FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../servies/contacts.service';
import { TaskService } from 'src/app/servies/task.service';
import { Tasks } from 'src/app/models/tasks';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-contact-status',
  templateUrl: './contact-status.component.html',
  styleUrls: ['./contact-status.component.css']
})
export class ContactStatusComponent implements OnInit {
  editProfileForm: FormGroup;
  contacts:Contacts;
  contact:Contacts;
  error: string;
  id:number;
  public show: boolean=false;
  public buttonName :any ='';
  public loggedIn = false;
  selectedPolicy : Contacts = {
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
    street: null,
  };
  editForm = new FormGroup({
    id: new FormControl(''),
    salutation: new FormControl(''),
    first_Name: new FormControl(''),
    middle_Name: new FormControl(''),
    last_Name: new FormControl(''),
    title: new FormControl(''),
    account_Name: new FormControl(''),
    phone_Number: new FormControl(''),
    mobile_Number: new FormControl(''),
    email: new FormControl(''),
    reports_To: new FormControl(''),
    department: new FormControl(''),
    fax: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    subject:new FormControl(''), 
    date1:new FormControl(''),
    date2:new FormControl(''),
    time1:new FormControl(''),
    assigned:new FormControl('')
  })
  ContactsService: any;
  tasks: any;
  constructor(
  private formBuilder: FormBuilder,private loginService: LoginService,
  private route: Router, private fb: FormBuilder,public taskService: TaskService,private modalService: NgbModal,
  private router: ActivatedRoute,
  private contactsService: ContactsService){}
  addForm: FormGroup;
  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(
      (data: Contacts) =>  {        console.log(data);
      }       
    );
    this.contacts = new Contacts();
    this.reloadData(this.editForm.value);
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
    this.editProfileForm = this.fb.group({
      id:[''],
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
    this.contactsService.getContacts(this.router.snapshot.params.id).subscribe(
      (data:Contacts) => {
        const str1 = data.salutation;
          const str2 = data.first_Name;
          const str3 = data.last_Name;
          var fullname = str1.concat(' ', str2).concat(' ', str3);
          console.log(fullname)
          document.getElementById("work").innerHTML= fullname;

          var fname = str1.concat(' ', str2).concat(' ', str3);
          document.getElementById("work1").innerHTML= fname;

          var fname = str1.concat(' ', str2).concat(' ', str3);
          document.getElementById("flname").innerHTML= fname;
      }
    );
    this.contactsService.getContacts(this.router.snapshot.params.id).subscribe((result)=>{
      this.editForm = new FormGroup({
        id: new FormControl(result['id']),
        salutation: new FormControl(result['salutation']),
        first_Name: new FormControl(result['first_Name']),
        middle_Name: new FormControl(result['middle_Name']),
        last_Name: new FormControl(result['last_Name']),
        title: new FormControl(result['title']),
        account_Name: new FormControl(result['account_Name']),
        phone_Number: new FormControl(result['phone_Number']),
        mobile_Number: new FormControl(result['mobile_Number']),
        email: new FormControl(result['email']),
        reports_To: new FormControl(result['reports_To']),
        department: new FormControl(result['department']),
        fax: new FormControl(result['fax']),
        address: new FormControl(result['address']),
        pincode: new FormControl(result['pincode']),
        country: new FormControl(result['country']),
        state: new FormControl(result['state']),
        city: new FormControl(result['city']),
        street: new FormControl(result['street']),
        assigned:new FormControl(result['assigned']),
        subject:new FormControl(result['subject']),
        date1:new FormControl(result['date1']),
        date2:new FormControl(result['date2']),
        time1:new FormControl(result['time1']),  
      })
    })
  };
  onSubmit() {
    this.updateForm(this.id);
  }
  reloadData(data) {
    this.contactsService.getContacts(data.id).subscribe(
      (data:Contacts) => {
        console.log(data);
      });
  }
  createOrUpdatePolicy(id){
    this.contactsService.updateContacts(id,this.selectedPolicy).subscribe(()=>{});
  }
  selectPolicy(contacts: Contacts){
    this.selectedPolicy = contacts;
  }
  updateForm(data) {
    this.contactsService.updateContacts(data.id, data).subscribe(()=>{
    });
  }
  onClickSubmit(data) {
    console.log(data.id);
    this.contactsService.updateContacts(data.id, data).subscribe(()=>{  
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
  toggle(contacts:Contacts){
    this.selectedPolicy=contacts;
    this.show=!this.show;
    if(this.show)
      this.buttonName = "";
    else
      this.buttonName = "";
  }
  deleteContacts(data) {
    this.contactsService.deleteContacts(data.id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData(data.id); 
      },
      error => console.log(error));
    }
    findbyid(id){
      this.contactsService.getContacts(id)
    .subscribe(
      data => {
        console.log(data);   
      },
      error => console.log(error));
    }
}

