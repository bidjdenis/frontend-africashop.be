import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Category } from '../../../payload/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public products : any[] = [];
  public listeOfCategories : Category[] = [];
  messageVisible = false;

  constructor(private memberService : MemberService){}

  ngOnInit(): void {
    this.getAllCategories();
   
  }

  getAllCategories(){
    this.listeOfCategories = [];
    this.memberService.getCategories().subscribe(res => {
      this.listeOfCategories.push(...res);
    })
  }

  

 
  arrayOfImgUrls = [

    {
      image: 'assets/img/home.jpg',
    },
    {
      image: 'assets/img/home2.jpg',
    },
    {
      image: 'assets/img/home3.jpg',
    }
  ]

}
