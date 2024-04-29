import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MemberComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    HttpClientModule
  ]
})
export class MemberModule { }
