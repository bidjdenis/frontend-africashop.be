import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CouponComponent,
    AddCouponComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CouponModule { }
