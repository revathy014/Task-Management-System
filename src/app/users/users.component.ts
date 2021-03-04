import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';
import { map } from 'rxjs/operators';
import { Employee } from '../employee';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employees: any;
  icon_img : string ="/assets/task_icon.jpeg"
  
  constructor(private router:Router, private tasklistService :TaskslistService) { }

  @Input() employee: Employee;

  ngOnInit(){
      this.getEmployeesList();
  }

  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.tasklistService.logout()
    this.isLogout.emit()
  }
  addEmployee(){
      this.router.navigate(['./registration'])
  }

  getEmployeesList() {
    this.tasklistService.getEmployeesList().snapshotChanges().pipe(
      map(data =>
        data.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(employees => {
      this.employees = employees;
    });
  }
 
  updateActive(isActive: boolean,emp:Employee) {
    this.tasklistService
      .updateEmployee(emp.key, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteEmployee(emp:Employee) {
    this.tasklistService
      .deleteEmployee(emp.key)
      .catch(err => console.log(err));
  }

  onChangeEvent($event) {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }
}