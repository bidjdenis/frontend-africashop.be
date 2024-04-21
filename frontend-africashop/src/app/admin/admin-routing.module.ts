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
