import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCouponComponent } from './components/list-coupon/list-coupon.component';


@NgModule({
  declarations: [
    CouponComponent,
    AddCouponComponent,
    ListCouponComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CouponModule { }
