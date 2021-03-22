// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { TaskslistService } from './taskslist.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AutoLoginGuard implements CanActivate {
//   constructor(public taskListService: TaskslistService, private router: Router) { }
//   canActivate(): Observable<boolean> | Promise<boolean> {    
//     return this.taskListService.isLogged().then((isAuthenticated) => {      
//       if (isAuthenticated) {   
//         this.taskListService.getUserRole().then((data) => { 
//           if(data==='manager') {           
//             this.router.navigate(['./home'])
//           }
//           if(data==='employee') {           
//             this.router.navigate(['./employee'])
//           }
//         });
//       }        
//       return true;      
//     });  
//   }
  
  
// }
