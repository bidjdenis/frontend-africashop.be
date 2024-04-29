import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../../payload/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  public users : User[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.users = [];
    this.adminService.getAllUsers().subscribe(res => {
      this.users.push(...res)
    })
  }

  onDelete(id:number){
    if(confirm("Are you sure for suppression?")){
      this.adminService.deleteUser(id).subscribe(res => {
        window.location.reload();
      })
    }
  }

}
