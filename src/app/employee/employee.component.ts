import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskslistService } from '../taskslist.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public taskListService: TaskslistService) { }

  icon_img : string ="/assets/task_icon.jpeg"
  


  ngOnInit() {
  }

  @Output() isLogout = new EventEmitter<void>()
  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }

  
  onChangeEvent($event){
    let input, filter, table, tr, td, i, txtValue, newdate : any;
    input = document.getElementById("myInput");
    filter = input.value;
    newdate = filter.split("-").reverse().join("-");
    console.log(filter,newdate)
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue == newdate) {
          tr[i].style.display = "";
        } 
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }


}
