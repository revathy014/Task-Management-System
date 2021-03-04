import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http'
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskslistService } from './taskslist.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

const appRoutes:Routes=[]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    UsersComponent,
    TasksComponent,
    EmployeeComponent,
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCiM2wpExZXz_PIM5AIRei12-vUYH9145s",
      authDomain: "loginauthentication-fbdb4.firebaseapp.com",
      projectId: "loginauthentication-fbdb4",
      storageBucket: "loginauthentication-fbdb4.appspot.com",
      messagingSenderId: "383938613890",
      appId: "1:383938613890:web:b34caa300f5122d6d8da9b"
    }),
  ],
  
  providers: [TaskslistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
