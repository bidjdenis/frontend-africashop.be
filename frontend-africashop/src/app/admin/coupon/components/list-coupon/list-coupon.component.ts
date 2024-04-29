import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Coupon } from '../../../../payload/coupon';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrl: './list-coupon.component.css'
})
export class ListCouponComponent implements OnInit{

  public coupons : Coupon[] = [];

  @Output() couponEmitted : EventEmitter<any> = new EventEmitter();

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

  onDelete(id:number){
    if(confirm("Are you sure for suppression?")){
      this.adminService.deleteCoupon(id).subscribe(res => {
        window.location.reload();
      })
    }
  }

  onUpdate(coupon : Coupon){
    this.couponEmitted.emit(coupon);
  }

}
