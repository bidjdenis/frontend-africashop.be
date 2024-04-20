import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();

  constructor(private storageService : StorageService, private router : Router){}


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('');
  }
}
