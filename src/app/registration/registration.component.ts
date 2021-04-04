import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { TaskslistService } from '../taskslist.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm :FormGroup
  genders :string []= ['Male','Female']
  employees=[];
  isSignedIn :boolean = false;
  icon_img : string ="/assets/task_icon.jpeg"
  signupemail :string
  signuppassword: string
  employee : Employee = new Employee();
  emp_id :string
  isCreated:boolean = false;

  constructor(private taskListService :TaskslistService) { }

  ngOnInit(): void {
      this.registrationForm = new FormGroup({
        'firstname' : new FormControl(null, Validators.required),
        'lastname' : new FormControl(null, Validators.required),
        'dob': new FormControl(null, Validators.required),
        'gender':new FormControl(null, Validators.required),
        'contactnumber' :new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'username' : new FormControl(null, Validators.required),
        'password' : new FormControl(null, Validators.required),
        'address' :new FormControl(null, Validators.required)
      })
  }
  successsweetalert(){
    Swal.fire({
        text: 'Registration Successful',
        icon: 'success'
      });
  }
  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }

  generateId(){
    return ("TMEMP" + Math.round(Math.random()*1000))
  }

  async onSignup(email:string, password:string){
    await this.taskListService.signup(email,password)
        if (this.taskListService.isLoggedIn){
          this.isSignedIn = true;
        }
    this.employee.firstname = this.registrationForm.controls.firstname.value; 
    this.employee.lastname = this.registrationForm.controls.lastname.value; 
    this.employee.dob = this.registrationForm.controls.dob.value
    this.employee.gender = this.registrationForm.controls.gender.value
    this.employee.contactnumber = this.registrationForm.controls.contactnumber.value
    this.employee.emailid = this.registrationForm.controls.email.value
    this.employee.username = this.registrationForm.controls.username.value
    this.employee.password = this.registrationForm.controls.password.value
    this.employee.address = this.registrationForm.controls.address.value
    this.employee.id = this.generateId();
    this.taskListService.createEmployee(this.employee);
    this.isCreated = true;
    this.registrationForm.reset();
    this.successsweetalert();
  }
  
  handleLogout(){
      this.isSignedIn = false;
   }
  }



