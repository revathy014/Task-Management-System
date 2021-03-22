import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router:Router, public taskListService: TaskslistService) { }
  usertype :string;
  loginForm :FormGroup
  isSignedIn :boolean = false;
  icon_img : string ="/assets/task_icon.jpeg"

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'usertype': new FormControl(null, Validators.required),
    })
    
      if (localStorage.getItem('user')!==null){
          this.isSignedIn = true;
      }
      else{
          this.isSignedIn = false;
      }
  }
  
  async onSignin(email:string, password:string, type:string){
      await this.taskListService.signin(email,password)
      if (this.taskListService.isLoggedIn){
            this.isSignedIn = true; 
            if(type=='manager'){
              this.router.navigate(['./home'])
            }
            else{
              this.router.navigate(['./employee'])
            }
      }
   }
  handleLogout(){
      this.isSignedIn = false;
  }
  
  onSubmit(){
    console.log("Submission Succesfull")
  }
  onLoadRegister(){
    this.router.navigate(['./registration'])
  }
}


