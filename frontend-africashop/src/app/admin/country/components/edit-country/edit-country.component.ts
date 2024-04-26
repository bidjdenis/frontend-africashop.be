import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../../../../payload/country';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css'
})
export class EditCountryComponent implements OnInit{

  @Input() country!: Country;
  countryForm! : FormGroup;
  submitted : boolean = false;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null
  imgChanged : boolean = false;
  existingImage : string | null = null;

  constructor(private adminService : AdminService, private fb : FormBuilder, private snackbar : MatSnackBar){}

  onFileSelected(event: any){
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
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile)
  }
  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name : ["", Validators.required]
    });
    this.setCountry(this.country);
  }

  get f(){return this.countryForm.controls}

  submit() : void{
    this.submitted = true;

    if(this.countryForm.invalid){
      return;
    }else{
      const updatedCountry = {name : this.f.name.value}
      this.adminService.updateCountry(this.country.id, updatedCountry)
            .subscribe(response => {
              console.log(response)
                this.countryForm.reset();
                window.location.reload();
                this.snackbar.open('Country updated successfully', 'Close', {
                    duration: 9000,
                });
            }, err => {
                console.log(err);
                this.snackbar.open('Error updating country', 'Close', {
                    duration: 5000,
                });
            });
    }
  }

  
  setCountry = (c:Country) => { 
    this.f.name.setValue(c.name);
    
   }
 
    }
    

