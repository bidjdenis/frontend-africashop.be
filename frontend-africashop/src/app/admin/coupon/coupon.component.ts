import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent implements OnInit{

 public couponShared : any;
 isUpdating : boolean = false;

  ngOnInit(): void {
  }

  get = ($event:any) =>{
    this.isUpdating = true;
    this.couponShared = $event;
  }
}
