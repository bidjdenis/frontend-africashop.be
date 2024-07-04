import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../../payload/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orders!: any;


  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.adminService.getAllOrders().subscribe(res =>{
      this.orders = res;
      console.log(res);
    })
  }

  changeOrderStatus(orderId: number, status:string){
    this.adminService.orderStatusChange(orderId,status).subscribe(res =>{
      if(res.id != null){
        this.getAllOrders();
      }else{
      }
    })
  }

}
