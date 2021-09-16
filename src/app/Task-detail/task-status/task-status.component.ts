import { Component, OnInit } from '@angular/core';
import { Tasks} from "../../models/tasks";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../servies/task.service';
import { FormControl,FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {

  editProfileForm: FormGroup;
  task:Tasks;
  tasks:Tasks;
  error: string;
  id:number;
  public show: boolean=false;
  public buttonName :any ='';

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
    id : new FormControl(''),
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

  constructor(private formBuilder: FormBuilder,
  private route: Router, private fb: FormBuilder,private modalService: NgbModal,
  private router: ActivatedRoute,
  private taskService: TaskService)
  { 
  // { this.taskService.listen().subscribe((m: any)=>{
  //  console.log(m);
  //  this.ngOnInit();

  // })
  }
  submitted = false;
  get t() { return this.editForm.controls; }
  onSubmittasks() {
   
      this.submitted = true;
      // stop here if form is invalid
      if (this.editForm.invalid) {
          return;
      }
      //True if all the fields are filled
      if(this.submitted)
      {
        this.refresh();
        $("#modal").modal("hide");
      }
     
  }
  addForm: FormGroup;

  ngOnInit() {

    this.tasks = new Tasks();
    
        this.reloadData();
        this.addForm = this.formBuilder.group({
          
          subject: ['', Validators.required],
      assigned: ['', Validators.required],
      date1: ['', Validators.required],
      t_name: ['', Validators.required],
      comments: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      date2: ['', Validators.required],
      time1: ['', Validators.required],

        });
        this.editForm = this.formBuilder.group({
          
          subject: ['', Validators.required],
      assigned: ['', Validators.required],
      date1: ['', Validators.required],
      t_name: ['', Validators.required],
      comments: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      date2: ['', Validators.required],
      time1: ['', Validators.required],

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
    

        this.taskService.getAllTasks().subscribe(
          (data: Tasks) => this.tasks =data,
          error => this.error=error
        );


        console.log(this.router.snapshot.params.id);
        this.taskService.getTask(this.router.snapshot.params.id).subscribe((result)=>{
          this.editForm = new FormGroup({
            id: new FormControl(result['id']),
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

  reloadData() {
    this.taskService.getAllTasks().subscribe(
      (data:Tasks) => this.tasks=data,
      error=>this.error=error
    );
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
  refresh(): void {
    window.location.reload();
   }

  onClickSubmit(data) {
    console.log(data.id);
    this.taskService.UpdateTasks(data.id, data).subscribe(()=>{
      
    });
    
  }

  selectPolicy(tasks: Tasks){
    this.selectedPolicy = tasks;
  }

  updateForm(data) {
    this.taskService.UpdateTasks(data.id, data).subscribe(()=>{
    });
  }

  toggle(tasks:Tasks){
    this.selectedPolicy=tasks;
    this.show=!this.show;
    if(this.show)
      this.buttonName = "";
    else
      this.buttonName = "";
  }
  deleteTasks(data) {
    this.taskService.deletetasks(data.id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
}

}

