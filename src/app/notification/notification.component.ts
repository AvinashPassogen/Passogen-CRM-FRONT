import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TaskService } from './../servies/task.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  
  id: number;
  tasks:Tasks;
  task:Tasks;
  error:string;
  today = new Date();
  tmrwDate = new Date(new Date().setDate(new Date().getDate() + 1));
  

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
  
  constructor(private TaskService:TaskService) { }

  ngOnInit(): void {
    this.reloadData();

  }

  reloadData() {
    this.TaskService.getAllTasks().subscribe(
      (data:Tasks)=> this.tasks=data,
      
      );
      
    }

  selectPolicy(tasks: Tasks){
    this.selectedPolicy = tasks;
  }
 
}