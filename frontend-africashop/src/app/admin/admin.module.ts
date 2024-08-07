import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';
import { OrderByStatusComponent } from './components/dashboard/order-by-status/order-by-status.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    OrdersComponent,
    ListProductComponent,
    AdminProfilComponent,
    OrderByStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
