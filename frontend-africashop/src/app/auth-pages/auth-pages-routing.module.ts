import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPagesComponent } from './auth-pages.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPagesComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import("./register/register.module").then((m) => m.RegisterModule)

      },
      {
        path: 'login',
        loadChildren: () => import("./login/login.module").then((m) => m.LoginModule)

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPagesRoutingModule { }
