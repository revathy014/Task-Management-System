import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskslistService } from 'src/app/taskslist.service';
import { Task } from '../task';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  status :string;
  icon_img : string ="/assets/task_icon.jpeg"
  tasks=[];
  isSubmit:boolean= false
  createTaskForm :FormGroup
  task : Task = new Task();
  employees: any;
  assigned_to :any;
  assignedToId : any;
  isCreated :boolean = false;
  today = new Date().toJSON().slice(0,10)
  updatekey : string;
  assignto :string;

  constructor(private taskListService :TaskslistService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.createTaskForm = new FormGroup({
        'taskname' : new FormControl(this.route.snapshot.params['taskname'], Validators.required),
        'assignedto' : new FormControl(this.route.snapshot.params['assignedto'], Validators.required),
        'assigneddate': new FormControl(this.route.snapshot.params['assigneddate'], Validators.required),
        'status' : new FormControl(this.route.snapshot.params['status'], Validators.required),
        'priority': new FormControl(this.route.snapshot.params['priority'], Validators.required)
      })
      this.getEmployees(); 
      console.log(this.route.snapshot.params['taskname']);
      console.log(this.route.snapshot.params['assignedto']);
      console.log(this.route.snapshot.params['assigneddate']);
      console.log(this.route.snapshot.params['status']);
      console.log(this.route.snapshot.params['priority']);
      this.updatekey=this.route.snapshot.params['key'] ;

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
    });
  }
  opensweetalert(){
    Swal.fire({
        text: 'Created  Successfully',
        icon: 'success'
      });
  }
  updatesweetalert(){
    Swal.fire({
        text: 'Updated Successfully',
        icon: 'success'
      });
  }
  updateTask(createTaskForm) {
    this.taskListService
      .updateTask(this.updatekey, {
            taskname : createTaskForm.controls.taskname.value,
            status: createTaskForm.controls.status.value, 
            priority: createTaskForm.controls.priority.value,
            assignedto: createTaskForm.controls.assignedto.value,
            assigneddate: createTaskForm.controls.assigneddate.value
        })
      .catch(err => console.log(err));
    this.updatesweetalert();
    this.router.navigate(['./home']) 
  }

  @Output() isLogout = new EventEmitter<void>()

  logout(){
    this.taskListService.logout()
    this.isLogout.emit()
  }
  generateId(){
    return ("TMTASK" + Math.round(Math.random()*1000))
  }

  createTask(){
      this.task.taskname = this.createTaskForm.controls.taskname.value;
      this.task.assignedto = this.createTaskForm.controls.assignedto.value;
      console.log("Task to",this.task.assignedto);
      // this.assignedToId = this.assigned_to[0];
      // this.assigned_to = this.assigned_to.slice(1);
      // this.assigned_to = this.assigned_to.join(" ");
      // this.task.assignedto = this.assigned_to + ' ' + '(' + this.assignedToId +')';
      this.task.assigneddate = this.createTaskForm.controls.assigneddate.value;
      this.task.status = this.createTaskForm.controls.status.value;
      this.task.priority = this.createTaskForm.controls.priority.value;
      this.task.id = this.generateId();
      this.taskListService.createTask(this.task);
      this.isCreated = true;
      this.createTaskForm.reset();
      this.opensweetalert();
  }
}
