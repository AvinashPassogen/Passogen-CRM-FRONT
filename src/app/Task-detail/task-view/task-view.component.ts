import { Component, OnInit } from '@angular/core';
import { Tasks} from "../../models/tasks";
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../servies/task.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/login.service';
declare var $: any;
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  editProfileForm: FormGroup;
  public loggedIn = false;
  id: number;
  tasks:Tasks;
  task:Tasks;
  error:string;

  selectedPolicy : Tasks = {
    id:null,
    subject: null,
    assigned: null,
    date1: null,
    t_name: null,
    comments: null,
    priority: null,
    status: null,
    date2: null,
    time1: null
  };

  constructor(private formBuilder: FormBuilder,
    private route:Router,private alertmsg: AlertService,private loginService: LoginService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router:ActivatedRoute,
    private TaskService:TaskService) { }

    addForm: FormGroup;
    submitted = false;
    get t() { return this.addForm.controls; }
    onSubmittasks() {
     
        this.submitted = true;
        // stop here if form is invalid
        if (this.addForm.invalid) {
            return;
        }
        //True if all the fields are filled
        if(this.submitted)
        {
          $("#modal").modal("hide");
        }
       
    }
  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    this.tasks = new Tasks();

    this.reloadData();
    this.addForm = this.formBuilder.group({
      
      subject: ['', Validators.required],
      assigned: [''],
      date1: [''],
      t_name: [''],
      comments: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      date2: [''],
      time1: ['']


    });

    this.editProfileForm = this.fb.group({
      id : [''],
      subject:['',Validators.required],
      assigned:['',Validators.required],
      date1:['',Validators.required],
      t_name:['', Validators.required],
      comments:[''],
      priority:['', Validators.required],
      status:[''],
      date2:[''],
      time1:['']
    });
    
  }

  openMod(targetModal, tasks) {
    this.modalService.open(targetModal, {size: 'lg',
    centered: true,
    backdrop: 'static'
  });
  

  this.TaskService.getTask(this.router.snapshot.params.id).subscribe((result)=>{
    this.editProfileForm.patchValue({
      id:tasks.id,
      subject:tasks.subject,
      assigned:tasks.assigned,
      date1:tasks.date1,
      t_name:tasks.t_name,
      comments:tasks.comments,
      priority:tasks.priority,
      status:tasks.status,
      date2:tasks.date2,
      time1:tasks.time1
    });
  })

  }


  reloadData() {
    this.TaskService.getAllTasks().subscribe(
      (data:Tasks) => this.tasks=data,
      error=>this.error=error
    );
  }

 
  selectPolicy(tasks: Tasks){
    this.selectedPolicy = tasks;
  }

  updateForm(id) {
    this.TaskService.UpdateTasks(id, this.selectedPolicy).subscribe(()=>{
      this.updateMsgs();
    });
  }

  deleteTasks(id: number) {
    this.TaskService.deletetasks(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
}
  
updateMsgs(){
  this.alertmsg.showSuccess("Data Update Successfully !!", "Passogen Technology");
}

}

