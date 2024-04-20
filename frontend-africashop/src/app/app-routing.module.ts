import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
  path:'auth-pages',
  loadChildren: () => import("./auth-pages/auth-pages.module").then((p) => p.AuthPagesModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
