import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { CartItemsDto } from '../../payload/cartItemsDto';
import { OrderItems } from '../../payload/orderItems';
import { Order } from '../../payload/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  public myOrders: Order[] = [];

  constructor(private memberService : MemberService){}

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(){
    this.memberService.getOrdersByUserId().subscribe(res => {
      this.myOrders = res;
      this.myOrders.forEach(order => {
        if (order.orderItems) {
          order.orderItems.forEach((item : OrderItems )=> {
            item.processedImg = 'data:image/jpeg;base64,' + item.processedImg;
          });
        }
      });
    });
  }

}
