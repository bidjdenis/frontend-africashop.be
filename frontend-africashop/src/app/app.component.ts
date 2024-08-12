import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';
import { VisitorService } from './visitor/services/visitor.service';
import { Country } from './payload/country';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  public countries: Country[] = [];

  constructor(
    private storageService: StorageService, 
    private router: Router, 
    private visitorService: VisitorService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'fr']);
    const browserLang = this.translate.getBrowserLang();
if (browserLang) {
  this.translate.use(['en', 'fr'].includes(browserLang) ? browserLang : 'en');
} else {
  this.translate.use('en');
}
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });

    this.getAllCountries();
  }

  getAllCountries() {
    this.countries = [];
    this.visitorService.getAllCountries().subscribe(res => {
      res.forEach((country: Country) => {
        country.processedImg = "data:image/jpeg;base64," + country.byteImg;
        this.countries.push(country);
      })
    });
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('visitor/home');
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const selectedLang = target.value; 
    this.translate.use(selectedLang); 
  }
}
