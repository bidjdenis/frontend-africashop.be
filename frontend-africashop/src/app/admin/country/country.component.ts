import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit{

  public countryShared: any;
  isUpdating: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  get = ($event : any) => {
    this.isUpdating = true;
    this.countryShared = $event;
  }

}
