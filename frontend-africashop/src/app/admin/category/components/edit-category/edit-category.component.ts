import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../../payload/category';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit{

  
  @Input() category!: Category;
  categoryForm!: FormGroup;
  submitted: boolean = false;
  
  constructor(private adminService : AdminService, private fb : FormBuilder, 
    private router : Router, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name : ["", Validators.required],
    })
    this.setCategory(this.category);
  }

  get f (){ return this.categoryForm.controls}

  submit(): void {
    this.submitted =  true;
    if (this.categoryForm.invalid) {
        return;
    } else {
        const updatedCategory = {
            name: this.f.name.value
        };

        this.adminService.updateCategory(updatedCategory, this.category.id)
            .subscribe(response => {
              console.log(response)
                this.categoryForm.reset();
                window.location.reload();
                this.snackbar.open('Category updated successfully', 'Close', {
                    duration: 2000,
                });
            }, err => {
                console.log(err);
                this.snackbar.open('Error updating category', 'Close', {
                    duration: 2000,
                });
            });
    }
}


  setCategory = (c:Category) => { 
   this.f.name.setValue(c.name);
   
  }


 

}
