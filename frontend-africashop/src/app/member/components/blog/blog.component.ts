import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Blog } from '../../../payload/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  
  public listeOfBlogs : Blog[] = [];

  constructor(private memberService : MemberService){}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(){
    this.listeOfBlogs = [];
    this.memberService.getAllBlogs().subscribe(res => {
      res.forEach((blog : Blog) =>{
        blog.processedImg="data:image/jpeg;base64," + blog.byteImg;
        this.listeOfBlogs.push(blog)
      })
    })

  }
}
