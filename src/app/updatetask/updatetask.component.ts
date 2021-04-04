import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  updateTaskForm :FormGroup
  icon_img : string ="/assets/task_icon.jpeg"
  updatekey : string;
  employees: any;
  constructor(private taskListService :TaskslistService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.updateTaskForm = new FormGroup({
      'taskname' : new FormControl(null, Validators.required),
      'assignedto' : new FormControl(null, Validators.required),
      'assigneddate': new FormControl(null, Validators.required),
      'status' : new FormControl(null, Validators.required),
      'priority': new FormControl(null, Validators.required)
    })
    this.getEmployees();
    
    this.updatekey = this.route.snapshot.params['key'];
    console.log("this.updatekey",this.updatekey);
  }

  getEmployees() {
    this.taskListService.getEmployeesList().snapshotChanges().pipe(
      map(data =>
        data.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(employees => {
      this.employees = employees;

      console.log("Employeessss",this.employees);
    });
  }
  

  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }
  updateTaskalert(){
    Swal.fire({
        text: 'Updated Successfully',
        icon: 'success'
      });
  }

  updateTask(updateTaskForm) {
    this.taskListService
      .updateTask(this.updatekey, {
            taskname : updateTaskForm.controls.taskname.value,
            status: updateTaskForm.controls.status.value, 
            priority: updateTaskForm.controls.priority.value,
            assignedto: updateTaskForm.controls.assignedto.value,
            assigneddate: updateTaskForm.controls.assigneddate.value
        })
      .catch(err => console.log(err));
    this.updateTaskalert();
    this.router.navigate(['./home']) 
  }
}
