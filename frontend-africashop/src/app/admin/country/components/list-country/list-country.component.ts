import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Country } from '../../../../payload/country';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrl: './list-country.component.css'
})
export class ListCountryComponent implements OnInit{

  countries : any[] = []
  
  constructor(private adminService : AdminService){}

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
  

}
