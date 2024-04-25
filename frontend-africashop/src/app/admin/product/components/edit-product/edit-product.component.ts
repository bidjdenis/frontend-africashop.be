import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../payload/category';
import { Country } from '../../../../payload/country';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  listOfCategories : Category[] = [];
  listOfCountries : Country[] = [];
  productForm! : FormGroup;
  id! : number;
  selectedFile! : File;
  imagePreview! : string | ArrayBuffer | null;
  imgChanged : boolean = false;
  existingImage : string | null = null;
  submitted : boolean = false;

  constructor(private adminService : AdminService, private fb : FormBuilder, private snackbar : MatSnackBar, 
    private activatedRoute : ActivatedRoute, private router : Router){}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;

    this.existingImage = null;
  }

  previewImage(){
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné');
      return;
    }
  
    if (!(this.selectedFile instanceof Blob)) {
      console.error('Le fichier sélectionné n\'est pas de type Blob');
      return;
    }
    const reader = new FileReader();
    reader.onload =  () => {
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
    });

    this.id = this.activatedRoute.snapshot.params["id"];
    this.getAllCategories();
    this.getAllCountries();
    this.getProductById();

  }

  get f(){return this.productForm.controls}

  getAllCategories(){
    this.listOfCategories = [];
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories.push(...res)
    })
  }

  getAllCountries(){
    this.listOfCountries = [];
    this.adminService.getAllCountries().subscribe(res => {
      this.listOfCountries.push(...res)
    })
  }

  getProductById(){
    this.adminService.getProductById(this.id).subscribe(res => {
      this.productForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    })
  }

  updateProduct(){
    this.submitted = true;
    if(this.productForm.valid){
      const formdata : FormData = new FormData();

      if(this.imgChanged && this.selectedFile){
        formdata.append('img', this.selectedFile)
      } 
      formdata.append('name', this.productForm.get('name')?.value);
      formdata.append('price', this.productForm.get('price')?.value);
      formdata.append('weight', this.productForm.get('weight')?.value);
      formdata.append('description', this.productForm.get('description')?.value);
      formdata.append('categoryId', this.productForm.get('categoryId')?.value);
      formdata.append('countryId', this.productForm.get('countryId')?.value);

      this.adminService.updateProduct(this.id, formdata).subscribe(res => {
      this.router.navigateByUrl('/admin/product')        
        this.snackbar.open("updated successfull", "close", {duration: 5000})
      }, (err : any )=> {console.log(err)})
    }
  }



}
