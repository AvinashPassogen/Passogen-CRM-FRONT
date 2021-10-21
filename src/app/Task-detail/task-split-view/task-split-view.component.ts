import { Component, OnInit } from '@angular/core';
import { Tasks} from "../../models/tasks";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../servies/task.service';
import { FormControl,FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-task-split-view',
  templateUrl: './task-split-view.component.html',
  styleUrls: ['./task-split-view.component.css']
})
export class TaskSplitViewComponent implements OnInit {

  editProfileForm: FormGroup;
  task:Tasks;
  tasks:Tasks;
  error: string;
  id:number;
  public show: boolean=false;
  public hide: boolean=true;
  public buttonName :any ='';
  public hide1=0;
  public loggedIn = false;
  tutorials: any;
 
  subject = '';
  //first_Name = '';

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

  editForm = new FormGroup({
    subject: new FormControl(''),
    assigned: new FormControl(''),
    date1: new FormControl(''),
    t_name: new FormControl(''),
    comments: new FormControl(''),
    priority: new FormControl(''),
    status: new FormControl(''),
    date2: new FormControl(''),
    time1: new FormControl(''),

  })
  constructor(private formBuilder: FormBuilder,private loginService: LoginService,
  private route: Router, 
  private fb: FormBuilder,
  private modalService: NgbModal,
  private router: ActivatedRoute,
  private taskService: TaskService)
  { 
  }
  addForm: FormGroup;

  ngOnInit() {
    this.loggedIn = this.loginService.isLoggedIn();
    this.tasks = new Tasks();
    
        this.retrieveTutorials();
        this.addForm = this.formBuilder.group({
          
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
        

    // this.taskService.getAllTasks().subscribe(
    //   (data: Tasks) => this.tasks =data,
    //   error => this.error=error
    // );


    console.log(this.router.snapshot.params.id);
    this.taskService.getTask(this.router.snapshot.params.id).subscribe((result)=>{
      this.editForm = new FormGroup({
        subject: new FormControl(result['subject']),
        assigned: new FormControl(result['assigned']),
        date1: new FormControl(result['date1']),
        t_name: new FormControl(result['t_name']),
        comments: new FormControl(result['comments']),
        priority: new FormControl(result['priority']),
        status: new FormControl(result['status']),
        date2: new FormControl(result['date2']),
        time1: new FormControl(result['time1']),
      })

    })
  };

  uptasks(id: number,task){
    this.ngOnInit();
   // this.TaskService.getTask(this.router.snapshot.params.id);
    this.route.navigate(['/tasks-status',id]);
  }
  openMod(targetModal, tasks) {
    this.modalService.open(targetModal, {size: 'lg',
    centered: true,
    backdrop: 'static'
  });

  this.taskService.getTask(this.router.snapshot.params.id).subscribe((result)=>{
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

onSubmit() {
    this.updateForm(this.id);
  }


  retrieveTutorials() {
    this.taskService.getAllTasks()
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
    this.taskService.findByTitle(this.subject)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // updateForm() {
  //   this.TaskService.UpdateTasks(this.router.snapshot.params.id, this.editProfileForm.value)
  //   .subscribe(data =>{
  //     this.editProfileForm.reset();
  //     this.route.navigate(['/view']);
  //   },
  //   error=>console.log(error));
  // }
 

  createOrUpdatePolicy(id){
    this.taskService.UpdateTasks(id,this.selectedPolicy).subscribe(()=>{

    });
  }

  selectPolicy(tasks: Tasks){
    this.selectedPolicy = tasks;
  }

  updateForm(id) {
    this.taskService.UpdateTasks(id, this.selectedPolicy).subscribe(()=>{
    });
  }

  toggle(tasks:Tasks){
    if(this.hide1==0){
      this.selectedPolicy=tasks;
      this.show=!this.show;
      this.hide=!this.hide;
      if(this.show)
        this.buttonName = "";
      else(this.hide)
        this.buttonName = "";
        this.hide1=this.hide1+1;
    }
    else(this.hide1==1)
    this.selectedPolicy=tasks;

  }

  deleteTasks(id: number) {
    this.taskService.deletetasks(id)
    .subscribe(
      data => {
        console.log(data);
        //this.reloadData();
      },
      error => console.log(error));
}
}

