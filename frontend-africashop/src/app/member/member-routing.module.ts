import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountryProductComponent } from './components/country-product/country-product.component';

const routes: Routes = [
  {path: '', component: MemberComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'country-product/:id', component: CountryProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
