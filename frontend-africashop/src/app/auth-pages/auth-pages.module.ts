import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { AuthPagesComponent } from './auth-pages.component';


@NgModule({
  declarations: [
    AuthPagesComponent
  ],
  imports: [
    CommonModule,
    AuthPagesRoutingModule
  ]
})
export class AuthPagesModule { }
