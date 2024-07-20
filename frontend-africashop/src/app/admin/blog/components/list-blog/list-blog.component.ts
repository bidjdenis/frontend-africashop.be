import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../../payload/blog';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css'
})
export class ListBlogComponent implements OnInit{

  public blog : Blog[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(){
    this.blog = [];
    this.adminService.getAllBlogs().subscribe(res=> {
      res.forEach((blogs: Blog) => {
        blogs.processedImg = 'data:image/jpeg;base64,' + blogs.byteImg;
        this.blog.push(blogs);
      });
    });
  }

}
