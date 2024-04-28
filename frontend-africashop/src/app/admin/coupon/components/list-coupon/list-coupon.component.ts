import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Coupon } from '../../../../payload/coupon';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrl: './list-coupon.component.css'
})
export class ListCouponComponent implements OnInit{

  public coupons : Coupon[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(){
    this.coupons = [];
    this.adminService.getAllCoupons().subscribe(res => {
      this.coupons.push(...res)
    })
  }

}
