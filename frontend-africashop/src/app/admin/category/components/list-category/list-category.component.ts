import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../payload/category';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  category : Category[] = [];

  constructor(private adminService : AdminService, private snackbar : MatSnackBar){}

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

  onDelete(id : number){
    if(confirm('Are you sure for suppression')){
      this.adminService.deleteCategory(id).subscribe(res => {
        this.snackbar.open('deletion successful', 'close', {duration: 5000})
      })
    }
  }
}
