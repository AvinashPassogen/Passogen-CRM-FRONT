import { Component, OnInit } from '@angular/core';
import { Contacts } from "../../models/contacts";
import { FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../servies/contacts.service';
import { TaskService } from 'src/app/servies/task.service';
import { Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-contact-split-view',
  templateUrl: './contact-split-view.component.html',
  styleUrls: ['./contact-split-view.component.css']
})
export class ContactSplitViewComponent implements OnInit {
  editProfileForm: FormGroup;
  contacts: Contacts;
  contact: Contacts;
  error: string;
  id: number;
  tutorials: any;
 title = '';
  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = '';
  selectedPolicy: Contacts = {
    id: null,
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
  editForm = new FormGroup({
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
    assigned:new FormControl(''),
    date1:new FormControl('')
  })
  tasks: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public taskService: TaskService,
    private router: ActivatedRoute,
    private contactsService: ContactsService) { }
  addForm: FormGroup;
  ngOnInit() {
    this.retrieveTutorials();
    this.contacts = new Contacts();
    this.reloadData();
    this.addForm = this.formBuilder.group({
      salutation: [''],
      first_Name: ['', Validators.required],
      middle_Name: [''],
      last_Name: ['', Validators.required],
      title: [''],
      account_Name: [''],
      phone_Number: [''],
      mobile_Number: [''],
      email: [''],
      reports_To: [''],
      department: [''],
      fax: [''],
      address: [''],
      pincode: [''],
      country: [''],
      state: [''],
      city: [''],
      street: ['']
    });
    this.editProfileForm = this.fb.group({
      id: [''],
      salutation: [''],
      first_Name: ['', Validators.required],
      middle_Name: [''],
      last_Name: ['', Validators.required],
      title: [''],
      account_Name: [''],
      phone_Number: [''],
      mobile_Number: [''],
      email: [''],
      reports_To: [''],
      department: [''],
      fax: [''],
      address: [''],
      pincode: [''],
      country: [''],
      state: [''],
      city: [''],
      street: ['']
    });
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
        date1:new FormControl(result['date1'])
        
      })
    })
  };

  upcontacts(id: number) {
    this.route.navigate(['/contacts-status', id]);
  }
  
  openMod(targetModal, contacts) {
    this.modalService.open(targetModal, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    this.contactsService.getContacts(this.router.snapshot.params.id).subscribe((result) => {
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
        address: contacts.address,
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
   this.contactsService.getAllContacts().subscribe(
       (data: Contacts) => this.contacts = data,
   error => this.error = error
     );
   }

  retrieveTutorials() {
    this.contactsService.getAllContacts()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this.contactsService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  createOrUpdatePolicy(id) {
    this.contactsService.updateContacts(id, this.selectedPolicy).subscribe(() => {
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
  selectPolicy(contacts: Contacts) {
    this.selectedPolicy = contacts;
  }

  updateForm(id) {
    this.contactsService.updateContacts(id, this.selectedPolicy).subscribe(() => {
    });
  }

  deleteContacts(id: number) {
    this.contactsService.deleteContacts(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
}

  toggle(contacts: Contacts) {
    this.selectedPolicy = contacts;
    console.log(this.selectedPolicy.id);
    this.show = !this.show;
    this.hide = !this.hide;
    if (this.show)
      this.buttonName = "";
      
    else(this.hide)
      this.buttonName = "";
      this.contactsService.getContacts(this.selectedPolicy.id).subscribe(
        (data:Contacts) => {
          const str1 = data.salutation;
            const str2 = data.first_Name;
            const str3 = data.last_Name;
            var fullname = str1.concat(' ', str2).concat(' ', str3);
            console.log(fullname)
            document.getElementById("work").innerHTML= fullname;
            document.getElementById("work1").innerHTML= fullname;
        }
        
      );
  }

}