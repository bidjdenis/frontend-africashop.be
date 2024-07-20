import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBlogComponent } from './components/list-blog/list-blog.component';


@NgModule({
  declarations: [
    BlogComponent,
    AddBlogComponent,
    ListBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
