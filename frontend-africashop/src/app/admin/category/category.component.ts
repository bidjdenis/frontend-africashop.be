import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  public categoryShared: any;
  isUpdating: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  get = ($event: any) => {  
    this.isUpdating  = true;
    this.categoryShared = $event;
  }

}
