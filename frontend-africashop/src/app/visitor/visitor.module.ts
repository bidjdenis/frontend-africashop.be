import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryProductComponent } from './components/country-product/country-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';


@NgModule({
  declarations: [
    HomeComponent,
    CountryProductComponent,
    CategoryProductComponent
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