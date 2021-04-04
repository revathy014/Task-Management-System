import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';
import { map } from 'rxjs/operators';
import { Employee } from '../employee';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employees: any;
  icon_img : string ="/assets/task_icon.jpeg"
  deleteKey:string;
  emp_key : string;
  constructor(private tasklistService :TaskslistService, private router:Router, private route: ActivatedRoute) { }

  @Input() employee: Employee;

  ngOnInit(){
      this.getEmployeesList();
      this.emp_key =this.route.snapshot.params['key'];

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
  deleteEmployeeAlert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      
      if (result.value) {
        
      Swal.fire(

        this.deleteEmp(),
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
      )
      }
    })
  }

  activeStatusAlert(isActive: boolean){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your status will be changed!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      
      if (result.value) {
        
      Swal.fire(

        this.updateActiveStatus(isActive),
        'Changed!',
      )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
      )
      }
    })
  }
  
  deleteEmp() {
    this.deleteKey = this.route.snapshot.params['key'];
    console.log("keyyy",this.deleteKey)
    this.tasklistService
      .deleteEmployee(this.deleteKey)
      .catch(err => console.log(err));
  }

  updateActiveStatus(isActive: boolean) {
    this.tasklistService
      .updateEmployee(this.emp_key, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteEmployee(emp:Employee) {
    this.tasklistService
      .deleteEmployee(emp.key)
      .catch(err => console.log(err));
  }

  clearData($event){
    let search_date;
    search_date= document.getElementById("myInput");
    search_date.value = ' ';
    this.getEmployeesList();
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