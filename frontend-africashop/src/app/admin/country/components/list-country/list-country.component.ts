import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Country } from '../../../../payload/country';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrl: './list-country.component.css'
})
export class ListCountryComponent implements OnInit{

  countries : any[] = []

  constructor(private adminService : AdminService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.getAllCountry();
  }

  getAllCountry(){

    this.countries = [];
    this.adminService.getAllCountries().subscribe(res =>{
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.countries.push(element);
      });
      console.log(this.countries)
    })
  }

  onDelete(id:number){
    if(confirm('Are you sure for suppression?')){
      this.adminService.deleteCountry(id).subscribe(res => {
        this.snackbar.open('Deletion of country', 'close', {duration: 5000})
        window.location.reload();
      })

    }
  }
  

}
