import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  data:any;

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe(res => {
      this.data = res;
    }, error => {
      console.error("Error fetching analytics data", error);
    });
  }

  
}
