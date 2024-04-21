import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  
  categoryForm! : FormGroup
  submitted : boolean = false;
  
  constructor(private adminService : AdminService, private router : Router, 
    private fb : FormBuilder, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name : ["", Validators.required],
    })
  }

  get f (){ return this.categoryForm.controls}

  postCategory() : void{
    this.submitted = true;

    if(this.categoryForm.invalid){
      return;
    }
    else{
      this.adminService.saveCategory(this.categoryForm.value).subscribe(res => {
	    this.snackbar.open('Add successfully', 'close', {duration: 5000});
        this.router.navigateByUrl('/admin/dashboard')
      })
      
    }
  }

}
