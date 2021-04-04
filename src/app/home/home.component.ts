import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskslistService } from '../taskslist.service';
import { map } from 'rxjs/operators';
import { Task } from '../task';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {DataTablesModule} from 'angular-datatables';

declare var $: any;
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
  deleteKey :string;

  constructor(private router:Router, private route: ActivatedRoute, private tasklistService :TaskslistService) { }
  dtOptions: DataTables.Settings = {};
  task_key : string;
  
  ngOnInit() {
    this.getTasksList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true
    };
    this.task_key =this.route.snapshot.params['key'];

  }

  deleteTaskAlert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      
      if (result.value) {
        
      Swal.fire(
        this.deleteTask(),
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

  statusChangeAlert(status:string, task:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your status will be changed',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, keep it'
    })
    .then((result) => {
      if (result.value) {
      Swal.fire(
        this.updateStatus(status, task),
        'Status Changed!'
      )} 
      else if (result.dismiss === Swal.DismissReason.cancel){
      Swal.fire(
        'Cancelled',
      )
      }
    })
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

  updateStatus(status:string, task:any) {
    console.log("Staus",status, this.task_key);
    this.tasklistService
      .updateTask(task, { status:status})
      .catch(err => console.log(err));
  }
 
  deleteTask() {
    this.deleteKey = this.route.snapshot.params['id'];
    console.log("keyyy",this.deleteKey)
    this.tasklistService
      .deleteTask(this.deleteKey)
      .catch(err => console.log(err));
  }
  clearData($event){
    let search_date;
    search_date= document.getElementById("myInput");
    search_date.value = ' ';
    this.getTasksList();
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


