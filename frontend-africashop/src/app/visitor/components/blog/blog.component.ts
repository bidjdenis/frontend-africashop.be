import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { Blog } from '../../../payload/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  
  public listeOfBlogs : Blog[] = [];

  constructor(private visitoorService : VisitorService){}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(){
    this.listeOfBlogs = [];
    this.visitoorService.getAllBlogs().subscribe(res => {
      res.forEach((blog : Blog) =>{
        blog.processedImg="data:image/jpeg;base64," + blog.byteImg;
        this.listeOfBlogs.push(blog)
      })
    })

  }

}
