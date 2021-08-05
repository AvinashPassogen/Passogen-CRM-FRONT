import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tasks } from "../models/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/task'

  url = 'http://localhost:8080/api/insertTask'
  constructor(private http : HttpClient) { }
  getAllTasks(){
    return this.http.get<Tasks>(this.baseUrl).pipe();
  }

  deletetasks(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }

    // getTask(id: number): Observable<any> {
    //   return this.http.get(`${this.baseUrl}/${id}`);
    // }

  getTask(id: number){
    return this.http.get<Tasks>(this.baseUrl+'/'+id).pipe();
  }

  UpdateTasks(id: number, tasks: any) : Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`,tasks);
  }

  insertTask(tasks: any): Observable<Object> {
    return this.http.post(`${this.url}`,tasks);
  }

  createTask(tasks: any): Observable<Object> {
    console.log(tasks);
    return this.http.post(`${this.baseUrl}`,tasks);
    
  }

  findByTitle(subject) {
    return this.http.get(`${this.baseUrl}?subject=${subject}`);
  }
}
