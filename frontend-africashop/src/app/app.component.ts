import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';
import { VisitorService } from './visitor/services/visitor.service';
import { Country } from './payload/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();
  public countries : Country[] = [];

  constructor(private storageService : StorageService, private router : Router, private visitorService : VisitorService){}


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
    this.getAllCountries();
  }

  getAllCountries(){
    this.countries = [];
    this.visitorService.getAllCountries().subscribe( res => {
      res.forEach((country : Country) => {country.processedImg = "data:image/jpeg;base64," + country.byteImg;
        this.countries.push(country);
      })
      });
    }
   

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('');
  }
}
