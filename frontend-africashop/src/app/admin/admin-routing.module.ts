import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';

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
    }
  ]
  },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
