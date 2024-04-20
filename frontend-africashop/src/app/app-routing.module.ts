import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
  path:'auth-pages',
  loadChildren: () => import("./auth-pages/auth-pages.module").then((p) => p.AuthPagesModule)
},
{
  path:'admin',
  loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule)
},
{
  path:'member',
  loadChildren: () => import("./member/member.module").then((m) => m.MemberModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
