import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    MemberComponent,
    DashboardComponent,
    CountryProductComponent,
    CategoryProductComponent,
    CartComponent,
    WishlistComponent,
    ProductDetailComponent,
    CheckoutComponent,
    CouponComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }
