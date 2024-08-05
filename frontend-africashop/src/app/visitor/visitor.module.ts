import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    CountryProductComponent,
    CategoryProductComponent,
    CartComponent,
    WishlistComponent,
    ProductDetailComponent,
    CouponComponent,
    TrackingComponent,
    BlogComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VisitorModule { }
