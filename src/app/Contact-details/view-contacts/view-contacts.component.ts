import { Component, OnInit } from '@angular/core';
import { Contacts} from "../../models/contacts";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../servies/contacts.service';
import { ApiService } from 'src/app/api.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {
  editProfileForm: FormGroup;
  id: number;
  contacts:Contacts;
  contact:Contacts;
  error:string;
  countries: {};
  states: {};
  cities: {};

  selectedPolicy: Contacts = { 
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
       street: null
  };
  constructor(private formBuilder: FormBuilder,private alertmsg: AlertService,
    private route:Router,private fb: FormBuilder,private modalService: NgbModal,
    private router:ActivatedRoute,
    private ContactsService:ContactsService, private apiService: ApiService) { }
    addForm: FormGroup;
  ngOnInit(): void {
    this.contacts = new Contacts();

    this.getAllCountries();

    this.reloadData();
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
  }
  upcontacts(id: number){
    this.route.navigate(['/contacts-status',id]);
  }
  openMod(targetModal, contacts) {
    this.modalService.open(targetModal, {size: 'lg',
    centered: true,
    backdrop: 'static'
  });
  this.ContactsService.getContacts(this.router.snapshot.params.id).subscribe((result)=>{
    this.editProfileForm.patchValue({
      id: contacts.id,
      salutation: contacts.salutation,
      first_Name: contacts.first_Name,
      middle_Name: contacts.middle_Name,
      last_Name: contacts.last_Name,
      title: contacts.title,
      phone_Number: contacts.phone_Number,
      mobile_Number: contacts.mobile_Number,
      email: contacts.email,
      account_Name: contacts.account_Name,
      reports_To: contacts.reports_To,
      department: contacts.department,
      fax: contacts.fax,
      address:contacts.address,
      pincode: contacts.pincode,
      country: contacts.country,
      state: contacts.state,
      city: contacts.city,
      street: contacts.street
    });
  })
  }
  onSubmit() {
    this.updateForm(this.id);
  }
  reloadData() {
    this.ContactsService.getAllContacts().subscribe(
      (data:Contacts) => this.contacts=data,
      error=>this.error=error
    );
  }
  refresh(): void {
    window.location.reload();
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

  
  selectPolicy(contacts: Contacts){
    this.selectedPolicy = contacts;
    if(this.selectedPolicy.country){
      this.getState(this.selectedPolicy.country);
    }
    if(this.selectedPolicy.state){
      this.getCity(this.selectedPolicy.state);
    }
  }
  updateForm(id) {
    this.ContactsService.updateContacts(id, this.selectedPolicy).subscribe(()=>{
      this.updateMsgs();
    });
  }
  deleteContacts(id: number) {
    this.ContactsService.deleteContacts(id)
    .subscribe(
      data => {
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

updateMsgs(){
  this.alertmsg.showSuccess("Data Update Successfully !!", "Passogen Technology");
}

}
