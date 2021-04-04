import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from '../task';
import { TaskslistService } from '../taskslist.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public taskListService: TaskslistService) { }

  icon_img : string ="/assets/task_icon.jpeg"
  tasks:any;

  ngOnInit() {
    this.getTasksList();
  }
  getTasksList() {
    this.taskListService.getTasksList().snapshotChanges().pipe(
      map(data =>
        data.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  @Input() task: Task;

  @Output() isLogout = new EventEmitter<void>()
  
  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }

  updateTask(status: string,task:Task) {
    this.taskListService
      .updateTask(task.key, { status: status })
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
