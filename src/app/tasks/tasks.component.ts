import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskslistService } from 'src/app/taskslist.service';
import { Task } from '../task';
import { map } from 'rxjs/operators';

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

  constructor(private taskListService :TaskslistService) { }
  ngOnInit(): void {
      this.createTaskForm = new FormGroup({
        'taskname' : new FormControl(),
        'assignedto' : new FormControl(),
        'assigneddate': new FormControl(),
        'status' : new FormControl(),
        'priority': new FormControl()
      })
      this.getEmployees();
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
      this.assigned_to = this.createTaskForm.controls.assignedto.value.split(" ");
      this.assignedToId = this.assigned_to[0];
      this.assigned_to = this.assigned_to.slice(1);
      this.assigned_to = this.assigned_to.join(" ");
      this.task.assignedto = this.assigned_to + ' ' + '(' + this.assignedToId +')';
      this.task.assigneddate = this.createTaskForm.controls.assigneddate.value;
      this.task.status = this.createTaskForm.controls.status.value;
      this.task.priority = this.createTaskForm.controls.priority.value;
      this.task.id = this.generateId();
      this.taskListService.createTask(this.task);
  }
}
