import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { ListCountryComponent } from './components/list-country/list-country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent,
    ListCountryComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
