import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'country-product/:id', component: CountryProductComponent},
  {path: 'category-product/:id', component: CategoryProductComponent},
  {path:'cart', component: CartComponent},
  {path:"wishlist", component: WishlistComponent},
  {path:"product-detail/:id", component : ProductDetailComponent},
  {path:"checkout", component: CheckoutComponent},
  {path: "coupon",component : CouponComponent},
  {path:"orders", component : OrdersComponent},
  {path:"profile", component : ProfileComponent},
  {path:"blog", component: BlogComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
