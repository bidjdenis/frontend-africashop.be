import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../../payload/category';
import { Country } from '../../../../payload/country';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  listOfCategories : Category[] = [];
  listOfCountries : Country[] = [];
  submitted : boolean = false;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null
  productForm! : FormGroup

  constructor(private adminService : AdminService, private fb : FormBuilder, private snackbar : MatSnackBar){}
  
  onFileSelected(event :any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = ()=> {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name : ["", Validators.required],
      price : ["", Validators.required],
      weight : ["", Validators.required],
      description : ["", Validators.required],
      categoryId : ["", Validators.required],
      countryId : ["", Validators.required]
    })

    this.getAllCategories();
    this.getAllCountries();
  }

  get f(){return this.productForm.controls}

  getAllCategories(){
    this.listOfCategories = [];
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories.push(...res);
    })
  }


  getAllCountries(){
    this.listOfCountries = [];
    this.adminService.getAllCountries().subscribe(res => {
      this.listOfCountries.push(...res)
    })
  }

  postProduct():void{
    this.submitted = true;

    if(this.productForm.valid){
      const formdata : FormData = new FormData();

      formdata.append('img', this.selectedFile);
      formdata.append('categoryId', this.productForm.controls['categoryId'].value);
      formdata.append('countryId', this.productForm.controls['countryId'].value);
      formdata.append('name', this.productForm.controls['name'].value);
      formdata.append('price', this.productForm.controls['price'].value);
      formdata.append('weight', this.productForm.controls['weight'].value);
      formdata.append('description', this.productForm.controls['description'].value);

      this.adminService.createProduct(formdata).subscribe(res => {
        window.location.reload();
        this.snackbar.open('create successfully', 'close', {duration : 4000})
      })
    }
  }

}
