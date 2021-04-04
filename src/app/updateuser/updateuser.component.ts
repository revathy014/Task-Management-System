import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { TaskslistService } from '../taskslist.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  updateUserForm :FormGroup
  genders :string []= ['Male','Female']
  employees=[];
  isSignedIn :boolean = false;
  icon_img : string ="/assets/task_icon.jpeg"
  signupemail :string
  signuppassword: string
  employee : Employee = new Employee();
  emp_id :string
  isCreated:boolean = false;
  updatekey : string;

  constructor(private taskListService :TaskslistService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.updateUserForm = new FormGroup({
        'firstname' : new FormControl(this.route.snapshot.params['firstname'], Validators.required),
        'lastname' : new FormControl(this.route.snapshot.params['lastname'], Validators.required),
        'dob': new FormControl(this.route.snapshot.params['dob'], Validators.required),
        'gender':new FormControl(this.route.snapshot.params['gender'], Validators.required),
        'contactnumber' :new FormControl(this.route.snapshot.params['contactnumber'], Validators.required),
        'email': new FormControl(this.route.snapshot.params['emailid'], [Validators.required, Validators.email]),
        'username' : new FormControl(this.route.snapshot.params['username'], Validators.required),
        'password' : new FormControl(this.route.snapshot.params['password'], Validators.required),
        'address' :new FormControl(this.route.snapshot.params['address'], Validators.required)
      })
      this.updatekey = this.route.snapshot.params['key'] ;
  }

  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }

  updateEmployeealert(){
    Swal.fire({
        text: 'Updated Successfully',
        icon: 'success'
      });
  }

  updateUser(updateUserForm) {
    this.taskListService
      .updateEmployee(this.updatekey, {
            firstname : updateUserForm.controls.firstname.value,
            lastname: updateUserForm.controls.lastname.value, 
            dob: updateUserForm.controls.dob.value,
            gender: updateUserForm.controls.gender.value,
            contactnumber: updateUserForm.controls.contactnumber.value,
            email: updateUserForm.controls.email.value,
            username: updateUserForm.controls.username.value,
            password: updateUserForm.controls.password.value,
            address: updateUserForm.controls.address.value
        })
      .catch(err => console.log(err));
    this.updateEmployeealert();
    this.router.navigate(['./users']) 
  }
  
  handleLogout(){
      this.isSignedIn = false;
   }
  }









