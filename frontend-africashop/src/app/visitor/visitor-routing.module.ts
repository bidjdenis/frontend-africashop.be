import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path:'home', component : HomeComponent},
  {path:'country-product/:id', component: CountryProductComponent},
  {path:'category-product/:id', component: CategoryProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
