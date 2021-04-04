import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeComponent } from './employee/employee.component';
import { SignupComponent } from './signup/signup.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
// import { AutoLoginGuard } from './auto-login.guard';

const routes :Routes = [
    {path:'', pathMatch:'full',redirectTo:'login' },
    {path:'home', component:HomeComponent},
    {path:'home/:id', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'registration', component:RegistrationComponent},
    {path:'users', component:UsersComponent},
    {path:'users/:key', component:UsersComponent},
    {path:'tasks', component:TasksComponent},
    {path:'tasks/:key', component:TasksComponent},
    {path:'signout', component:LoginComponent},
    {path:'employee', component:EmployeeComponent},
    {path:'signup', component:SignupComponent},
    {path:'updatetask', component:UpdatetaskComponent},
    {path:'updatetask/:key', component:UpdatetaskComponent},
    {path:'updateuser', component:UpdateuserComponent},
    {path:'updateuser/:key', component:UpdateuserComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]
})
export class AppRoutingModule { }
