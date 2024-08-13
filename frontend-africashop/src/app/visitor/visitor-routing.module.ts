import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CdvComponent } from './components/cdv/cdv.component';
import { MentionsLegaleComponent } from './components/mentions-legale/mentions-legale.component';
import { ProtectionComponent } from './components/protection/protection.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path:'home', component : HomeComponent},
  {path:'country-product/:id', component: CountryProductComponent},
  {path:'category-product/:id', component: CategoryProductComponent},
  {path:'cart', component : CartComponent},
  {path:'wishlist', component : WishlistComponent},
  {path:'product-detail/:id', component: ProductDetailComponent},
  {path:'coupon', component : CouponComponent},
  {path:'tracking', component : TrackingComponent},
  {path:'blog', component: BlogComponent},
  {path:'blog-detail/:id', component: BlogDetailComponent},
  {path: 'cdv', component: CdvComponent},
  {path: 'mentions-legale', component : MentionsLegaleComponent},
  {path: 'protection', component : ProtectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
