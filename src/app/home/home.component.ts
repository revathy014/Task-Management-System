import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';
import { map } from 'rxjs/operators';
import { Task } from '../task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {
  searchdate : string;
  tasks:any;
  icon_img : string ="/assets/task_icon.jpeg"
  today = new Date().toJSON().slice(0,10)

  constructor(private router:Router, private tasklistService :TaskslistService) { }
  
  ngOnInit() {
    this.getTasksList();
  }

  @Input() task: Task;
 
  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.tasklistService.logout()
    this.isLogout.emit()
  }
  
  addTask(){
    this.router.navigate(['./tasks'])
  }

  getTasksList() {
    this.tasklistService.getTasksList().snapshotChanges().pipe(
      map(data =>
        data.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  updateTask(status: string,task:Task) {
    this.tasklistService
      .updateTask(task.key, { status: status })
      .catch(err => console.log(err));
  }
 
  deleteTask(task:Task) {
    this.tasklistService
      .deleteTask(task.key)
      .catch(err => console.log(err));
  }
 
  onChangeEvent($event){
    let input, filter, table, tr, td, i, txtValue, newdate : any ,formatted_date:any;
    let months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    input = document.getElementById("myInput");
    filter = input.value;
    let DateObj = new Date(filter); 
    let  datenum = DateObj.getDate();
    if (datenum < 10){
      formatted_date = "0" + DateObj.getDate() + " " + months[DateObj.getMonth()] + " " + DateObj.getFullYear()
    }
    if (datenum >10){
      formatted_date = DateObj.getDate() + " " + months[DateObj.getMonth()] + " " + DateObj.getFullYear()
    }
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue == formatted_date) {
          tr[i].style.display = "";
        } 
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


