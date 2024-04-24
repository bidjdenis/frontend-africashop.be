import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrl: './add-country.component.css'
})
export class AddCountryComponent implements OnInit {

  countryForm! : FormGroup;
  submitted : boolean = false;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null
  
  constructor(private adminService : AdminService, private fb : FormBuilder, private router : Router, private snackbar : MatSnackBar){}
  
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
    this.countryForm = this.fb.group({
      name : ["", Validators.required]
    })
  }

  get f(){return this.countryForm.controls}

  postCountry() : void{
    this.submitted = true;

    if(this.countryForm.valid){
      
      const formData : FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.countryForm.controls['name'].value);

      this.adminService.createCountry(formData).subscribe(res => {
        this.snackbar.open('Country create successfully', 'close',{duration: 2000})
        window.location.reload();
      }, err => {console.log(err)
      })
    }
   
  }

}
