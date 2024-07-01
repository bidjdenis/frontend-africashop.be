import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';

const routes: Routes = [

  {path:'', component: AdminComponent,
  children: [
    {
      path: 'category',
      loadChildren: () => import("./category/category.module").then((m) => m.CategoryModule)

    },
    {
      path:'country',
      loadChildren : () => import("./country/country.module").then((m) => m.CountryModule)
    },
    {
      path:'product',
      loadChildren : () => import("./product/product.module").then((m)=> m.ProductModule)
    },
    {
      path:'coupon',
      loadChildren : () => import("./coupon/coupon.module").then((m) => m.CouponModule)
    }
  ]
  },
  { path: 'dashboard', component: DashboardComponent },
  {path:'users', component: UsersComponent},
  {path:'orders', component : OrdersComponent},
  {path:'list-product', component: ListProductComponent},
  {path:'admin-profil', component : AdminProfilComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
