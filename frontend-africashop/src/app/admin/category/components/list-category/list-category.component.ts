import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../../../payload/category';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  @Output() categoryEmitted: EventEmitter<any> =   new EventEmitter();
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
        this.snackbar.open('deletion successful', 'close', {duration: 5000});
        window.location.reload();
      })
    }
  }

  onUpdate = (category: Category) => {
    this.categoryEmitted.emit(category);
  }
}
