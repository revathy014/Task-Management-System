import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { TaskslistService } from '../taskslist.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router ,private taskListService :TaskslistService) { }
  signUpForm :FormGroup
  genders :string []= ['Male','Female']
  employees=[];
  isSignedIn :boolean = false;
  icon_img : string ="/assets/task_icon.jpeg"
  signupemail :string
  signuppassword: string
  employee : Employee = new Employee();
  emp_id :string
  isCreated:boolean = false;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
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
  generateId(){
    return ("TMEMP" + Math.round(Math.random()*1000))
  }
  async signUp(email:string, password:string){
    await this.taskListService.signup(email,password)
        if (this.taskListService.isLoggedIn){
          this.isSignedIn = true;
        }
    this.employee.firstname = this.signUpForm.controls.firstname.value;
    this.employee.lastname =  this.signUpForm.controls.lastname.value;
    this.employee.dob = this.signUpForm.controls.dob.value
    this.employee.gender = this.signUpForm.controls.gender.value
    this.employee.contactnumber = this.signUpForm.controls.contactnumber.value
    this.employee.emailid = this.signUpForm.controls.email.value
    this.employee.username = this.signUpForm.controls.username.value
    this.employee.password = this.signUpForm.controls.password.value
    this.employee.address = this.signUpForm.controls.address.value
    this.employee.id = this.generateId()
    this.taskListService.createEmployee(this.employee);
    this.isCreated = true;
    this.signUpForm.reset();
    this.successsweetalert();
    this.router.navigate(['./login'])
  }
}
