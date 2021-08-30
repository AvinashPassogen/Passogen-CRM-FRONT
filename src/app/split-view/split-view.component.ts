import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadService } from "../lead.service";
import { Leads } from "../leads";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { AccountService } from '../servies/account.service';
import { Contacts } from '../models/contacts';
import { ContactsService } from '../servies/contacts.service';
import { OpportunityService } from '../servies/opportunity.service';
import { TaskService } from '../servies/task.service';
import { Tasks } from '../models/tasks';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.css']
})
export class SplitViewComponent implements OnInit {

  addForm: FormGroup;
  isPresent:boolean = true;

  leads: Leads;
  tutorials: any;
  error: string;
  plid: number;
  countries: {};
  states: {};
  cities: {};
  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = '';
  title = '';
  //first_Name = '';
  public myColor:string = 'blue';
  public n1;
  public n;
  tasks: Tasks = new Tasks();

  selectedPolicy:  Leads  = { plid: null,
    salutation: null,
  first_Name: null,
  middle_Name: null,
  last_Name: null,
  title: null,
  company_Name: null,
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
  rating: null};

  editForm = new FormGroup({
    plid: new FormControl(''),
    salutation:new FormControl(''),
    first_Name:new FormControl(''),
    middle_Name:new FormControl(''),
    last_Name:new FormControl(''),
    title:new FormControl(''),
    company_Name:new FormControl(''),
    industry:new FormControl(''),
    phone_Number:new FormControl(''),
    mobile_Number:new FormControl(''),
    email:new FormControl(''),
    lead_Status:new FormControl(''),
    owner:new FormControl(''),
    no_Of_Employees:new FormControl(''),
    lead_Source:new FormControl(''),
    address:new FormControl(''),
    pincode:new FormControl(''),
    country:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    rating:new FormControl(''),
    subject:new FormControl('')

  })

  
  editProfileForm = new FormGroup({
    salutation:new FormControl(''),
    first_Name:new FormControl(''),
    middle_Name:new FormControl(''),
    last_Name:new FormControl(''),
    title:new FormControl(''),
    company_Name:new FormControl(''),
    industry:new FormControl(''),
    phone_Number:new FormControl(''),
    mobile_Number:new FormControl(''),
    email:new FormControl(''),
    lead_Status:new FormControl(''),
    owner:new FormControl(''),
    no_Of_Employees:new FormControl(''),
    lead_Source:new FormControl(''),
    address:new FormControl(''),
    pincode:new FormControl(''),
    country:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    rating:new FormControl(''),
    account_name:new FormControl(''),
    account_owner:new FormControl(''),
    employee:new FormControl(''),
    description:new FormControl(''),
    type:new FormControl(''),
    website:new FormControl(''),
    parent_account:new FormControl(''),
})

  constructor(private formBuilder: FormBuilder,
    private route:Router,private contactService: ContactsService,
    private opportunityService: OpportunityService, private fb: FormBuilder,public taskService: TaskService,

     private accountService: AccountService,private modalService: NgbModal,private router:ActivatedRoute,
    private leadService:LeadService, private apiService: ApiService) {    
    
  }

  ngOnInit() {

    this.getAllCountries();
    this.retrieveTutorials();
    
    console.log(this.router.snapshot.params.id);
    this.leadService.getLeads(this.router.snapshot.params.id).subscribe((result) => {


      this.editForm = new FormGroup({
        plid: new FormControl(result['plid']),
        salutation:new FormControl(result['salutation']),
        first_Name:new FormControl(result['first_Name']),
        middle_Name:new FormControl(result['middle_Name']),
        last_Name:new FormControl(result['last_Name']),
        title:new FormControl(result['title']),
        company_Name:new FormControl(result['company_Name']),
        industry:new FormControl(result['industry']),
        phone_Number:new FormControl(result['phone_Number']),
        mobile_Number:new FormControl(result['mobile_Number']),
        email:new FormControl(result['email']),
        lead_Status:new FormControl(result['lead_Status']),
        owner:new FormControl(result['owner']),
        no_Of_Employees:new FormControl(result['no_Of_Employees']),
        lead_Source:new FormControl(result['lead_Source']),
        address:new FormControl(result['address']),
        pincode:new FormControl(result['pincode']),
        country:new FormControl(result['country']),
        state:new FormControl(result['state']),
        city:new FormControl(result['city']),
        rating:new FormControl(result['rating']),
        assigned:new FormControl(result['owner']),
        subject:new FormControl(result['subject'])

      })

      
      this.reloadData();
      this.addForm = this.formBuilder.group({
        salutation:[''],
        first_Name:['', Validators.required],
        middle_Name:[''],
        last_Name:['', Validators.required],
        title:[''],
        company_Name:['', Validators.required],
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
      
      this.editProfileForm = new FormGroup({
        salutation:new FormControl(result['salutation']),
        first_Name:new FormControl(result['first_Name']),
        middle_Name:new FormControl(result['middle_Name']),
        last_Name:new FormControl(result['last_Name']),
        title:new FormControl(result['title']),
        account_name:new FormControl(result['company_Name']),
        opportunity_name:new FormControl(result['company_Name']),
        account_Name:new FormControl(result['company_Name']),
        industry:new FormControl(result['industry']),
        phone_Number:new FormControl(result['phone_Number']),
        mobile_Number:new FormControl(result['mobile_Number']),
        email:new FormControl(result['email']),
        lead_Status:new FormControl(result['lead_Status']),
        owner:new FormControl(result['owner']),
        no_Of_Employees:new FormControl(result['no_Of_Employees']),
        employee:new FormControl(result['no_Of_Employees']),
        lead_Source:new FormControl(result['lead_Source']),
        lead_source:new FormControl(result['lead_Source']),
        address:new FormControl(result['address']),
        pincode:new FormControl(result['pincode']),
        country:new FormControl(result['country']),
        state:new FormControl(result['state']),
        city:new FormControl(result['city']),
        rating:new FormControl(result['rating']),
        
        account_owner:new FormControl(result['owner']),
      
        description:new FormControl(result['description']),
        type:new FormControl(result['type']),
        website:new FormControl(result['website']),
        parent_account:new FormControl(result['parent_account']),
      })
    })
  };

  selectPolicy(data){
    console.log(data.country)
    if(data.country){
      this.getState(data.country);

    }
    if(data.state){
      this.getCity(data.state);
    }
  }

  deleteLeads(plid: number) {
    // alert("are you sure");
    this.leadService.deleteleads(plid)
      .subscribe(
        data => {
        this.refresh();
        },

  );}
  refresh(): void {
    window.location.reload();
}
 
  retrieveTutorials() {
    this.leadService.getAllLeads()
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
  getAllCountries(){
    this.apiService.getAllCountries().subscribe(
      data => this.countries = data
    );
  }

  reloadData() {
    this.leadService.getAllLeads().subscribe(
      (data:Leads) =>this.leads= data,
      error=>this.error=error
    );
  }

  searchTitle() {
    this.leadService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getState(event){
    console.log(event);
    this.apiService.getStateByCountryId(event).subscribe(
      data => {
        this.states = data;
        this.cities = null;
    
console.log(this.states);      }
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

  createOrUpdatePolicy(plid){
    this.leadService.UpdateLeads(plid, this.selectedPolicy).subscribe(()=>{
      this.refresh();
     });
   }


  //hide & show Button
  toggle(leads: Leads) {

    this.selectedPolicy = leads;
    
    this.show = !this.show;
    this.hide = !this.hide;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "";
    else (this.hide)
      this.buttonName = "";
      this.changeStatus(this.editForm.value);
      
      this.leadService.getLeads(this.selectedPolicy.plid).subscribe(
        (data: Leads) => {
          const str1 = data.salutation;
          const str2 = data.first_Name;
          const str3 = data.last_Name;
          var fullname = str1.concat(' ', str2).concat(' ', str3);
          document.getElementById("abc").innerHTML= fullname;
          document.getElementById("work").innerHTML= fullname;
        }
        
      );
  }

  unqualifiedStatus(data)
  {
    
    this.n1=this.editForm.value.lead_Status;
    var n1 = this.n1;
    if(this.n1>1){
      data['lead_Status']=0;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
  }

  newStatus(data)
  {
    
    this.n1=this.editForm.value.lead_Status;
    var n1 = this.n1;
    if(this.n1>2){
      this.n = this.n1-1;
      data['lead_Status']=this.n1-this.n;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
    else{
    
      data['lead_Status']=1;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
  }

  workingStatus(data)
  {
    
    this.n1=this.editForm.value.lead_Status;
    var n1 = this.n1;
    if(this.n1>3){
      this.n = this.n1-2;
      data['lead_Status']=this.n1-this.n;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
    else{
      data['lead_Status']=2;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
  }

  nurturingStatus(data)
  {
    
    this.n1=this.editForm.value.lead_Status;
    var n1 = this.n1;
    if(this.n1>4){
      this.n = this.n1-3;
      data['lead_Status']=this.n1-this.n;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);
    }
    else{
      data['lead_Status']=3;
      console.log(data['lead_Status']);
      this.onClickSubmit(data);

    }
  }
  
  convert(data) {
    this.contactService.createContacts(this.editProfileForm.value)
      .subscribe(data => {
    });
    
    this.opportunityService.createOpportunity(this.editProfileForm.value)
    .subscribe(data => {
    });
    
    this.accountService.createAccount(this.editProfileForm.value)
    .subscribe(data => {
    });
    this.leadService.deleteleads(data.plid)
        .subscribe(
          data => {
            this.route.navigate(['/view']);
          },
          error => console.log(error));
  } 
  
  onClickSubmit(data) {
    console.log(data);
    this.leadService.Update(data.plid,data).subscribe(()=>{
    });
  }

  onToggleDivSizeChange(){
    const element = document.getElementById('xyz');
    if(this.isPresent){
      element.style.height ="1150px";
      this.isPresent = false;
    }else{
      element.style.height ="900px";
      this.isPresent = true;
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
  
  Update(plid){
    this.leadService.UpdateLeads(plid, this.selectedPolicy).subscribe(()=>{
      this.refresh();
     });
   }
    
   public toggleColor(data)
  {

          this.n1=this.editForm.value.lead_Status;     
       var n1=this.n1;
         if(this.n1==0){
      
           data['lead_Status']=++n1;
           document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
           document.getElementById('pills-profile-tab').style.backgroundColor = "#3C69C9";
           document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
           document.getElementById('pills-nurturing-tab').style.backgroundColor = "#3C69C9";
           document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
           console.log(data['lead_Status']);
           console.log(n1);
           this.onClickSubmit(data);
         }
         else if(this.n1==1){
          data['lead_Status']=++n1;
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
          document.getElementById('pills-nurturing-tab').style.backgroundColor = "#3C69C9";
           document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
           this.onClickSubmit(data);
           
         }
         else if(this.n1==2){
         
           data['lead_Status']=++n1;
           document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
           document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
           document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
           document.getElementById('pills-nurturing-tab').style.backgroundColor = "#3C69C9";
           document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
           this.onClickSubmit(data);
          
         }
        else if(this.n1==3){
           data['lead_Status']=++n1;
           document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-nurturing-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
           this.onClickSubmit(data);
          
        }
        else if(this.n1==4){
          data['lead_Status']=++n1;
          document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-nurturing-tab').style.backgroundColor = "#689f38";
          document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
          this.onClickSubmit(data);
        
        }
        else if(this.n1==5){
                        
              document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
              document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
              document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
              document.getElementById('pills-nurturing-tab').style.backgroundColor = "#689f38";
              document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";

              console.log(n1,data);
              this.onClickSubmit(data);
      
      }

}


public changeStatus(data)
{
      console.log(data);
      this.leadService.getLeads(this.router.snapshot.params.id).subscribe((result) => {
      this.n1=result['lead_Status'];
     
     
     var n1=this.n1;
     console.log("n",this.n1);
       if(this.n1==0){
         
         document.getElementById('pills-home-tab').style.backgroundColor = "#3C69C9";
         ++n1;
         console.log(data['lead_Status']);
         console.log(n1);
         this.onClickSubmit(data);
       }
       else if(this.n1==1){
       
        console.log(data['lead_Status']);
         document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-profile-tab').style.backgroundColor = "#3C69C9";
        
         data['lead_Status']=++n1;
         console.log(n1,data);
         this.onClickSubmit(data);

       }
       else if(this.n1==2){
      
        console.log("gfdsfghfdsf",data['lead_Status']);
         document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-contact-tab').style.backgroundColor = "#3C69C9";
        
         data['lead_Status']=++n1;
         console.log(n1,data);
         this.onClickSubmit(data);

       }
      else if(this.n1==3){
        
         document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
         document.getElementById('pills-nurturing-tab').style.backgroundColor = "#3C69C9";
        
         data['lead_Status']=++n1;
         console.log(n1,data);
         this.onClickSubmit(data);

      }
       else if(this.n1==4){
        
       document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
       document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
       document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
       document.getElementById('pills-nurturing-tab').style.backgroundColor = "#689f38";
       document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";
  
       data['lead_Status']=++n1;
       console.log(n1,data);
       this.onClickSubmit(data);

}
else if(this.n1==5){
        
document.getElementById('pills-home-tab').style.backgroundColor = "#689f38";
document.getElementById('pills-profile-tab').style.backgroundColor = "#689f38";
document.getElementById('pills-contact-tab').style.backgroundColor = "#689f38";
document.getElementById('pills-nurturing-tab').style.backgroundColor = "#689f38";
document.getElementById('pills-converted-tab').style.backgroundColor = "#3C69C9";

console.log(n1,data);
this.onClickSubmit(data);

}
}
);
}


}
