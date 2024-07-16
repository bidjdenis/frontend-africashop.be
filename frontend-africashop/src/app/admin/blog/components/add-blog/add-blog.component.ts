import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit{

  blogForm! : FormGroup;
  submitted : boolean = false;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null

  constructor(private adminService : AdminService,private fb : FormBuilder, private router : Router, private snackbar : MatSnackBar){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile)
  }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title : ["", Validators.required],
      content : ["", Validators.required],
      date : ["", Validators.required]
    })
  }

  get f(){return this.blogForm.controls}

  postBlog() : void{
    this.submitted = true;

    if(this.blogForm.valid){
      
      const formData : FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('title', this.blogForm.controls['title'].value);
      formData.append('content', this.blogForm.controls['content'].value);
      formData.append('date', this.blogForm.controls['date'].value);


      this.adminService.createBlog(formData).subscribe(res => {
        this.snackbar.open('Blog create successfully', 'close',{duration: 4000})
        window.location.reload();
      }, err => {console.log(err)
      })
    }
   
  }


}
