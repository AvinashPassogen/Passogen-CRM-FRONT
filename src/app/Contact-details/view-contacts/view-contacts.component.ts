import { Component, OnInit } from '@angular/core';
import { Contacts} from "../../models/contacts";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../servies/contacts.service';
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
  constructor(private formBuilder: FormBuilder,
    private route:Router,private fb: FormBuilder,private modalService: NgbModal,private router:ActivatedRoute,
    private ContactsService:ContactsService) { }
    addForm: FormGroup;
  ngOnInit(): void {
    this.contacts = new Contacts();
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
  resetForm()
  {
   this.addForm.reset();
   this.refresh();
  }
  refresh(): void {
    window.location.reload();
   }

  selectPolicy(contacts: Contacts){
    this.selectedPolicy = contacts;
  }
  updateForm(id) {
    this.ContactsService.updateContacts(id, this.selectedPolicy).subscribe(()=>{this.refresh();
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
}
