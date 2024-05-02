import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  BASIC_URL = "http://localhost:8080/";

  constructor(private http : HttpClient) { }

  getAllCountries(): Observable<any>{
    return this.http.get(this.BASIC_URL + 'public/countries', {
    })
}
}
