import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../payload/category';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  category : Category[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.category = [];
    this.adminService.getAllCategories().subscribe(res => {
      this.category.push(...res);
    }, err => {
      console.log(err);
    })
  }
}
