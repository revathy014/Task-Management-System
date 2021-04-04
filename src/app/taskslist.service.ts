import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskslistService {

  task:any
  isLoggedIn :boolean = false;
  private dbPath = '/employee';
  private dbPathTask = '/task';
  employeesRef : AngularFireList<Employee> = null;
  tasksRef : AngularFireList<Task> = null;
  // employeeRef :AngularFireObject<Employee> = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  storage: any;
  user_name :string;
  userRole = '';
  
  constructor(private router:Router, private http:HttpClient, public firebaseAuth: AngularFireAuth, private db: AngularFireDatabase ) {
    this.employeesRef = db.list(this.dbPath);
    this.tasksRef = db.list(this.dbPathTask);

  }
  createEmployee(employee :Employee): void{
    this.employeesRef.push(employee);
  }

  updateEmployee(key:string, value:any): Promise <void>{
    console.log("Key, Vlaue",key,value)
    return this.employeesRef.update(key, value);
  }

  deleteEmployee(key:string): Promise <void>{
    return this.employeesRef.remove(key);
  }

  getEmployeesList(): AngularFireList <Employee>{
    return this.employeesRef;
  }

  deleteAll():Promise <void>{
    return this.employeesRef.remove();
  }

  createTask(task :Task): void{
    this.tasksRef.push(task);
  }
  updateTask(key:string, value:any): Promise <void>{
    console.log("Key, Vlaue",key, value);
    return this.tasksRef.update(key, value);
  }

  deleteTask(key:string): Promise <void>{
    console.log("Key",key)
    return this.tasksRef.remove(key);
  }

  getTasksList(): AngularFireList <Task>{
    return this.tasksRef;
  }
 
  deleteAllTasks():Promise <void>{
    return this.tasksRef.remove();
  }
  
  async signin(email:string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  async signup(email:string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate(['./login'])
  }

}

