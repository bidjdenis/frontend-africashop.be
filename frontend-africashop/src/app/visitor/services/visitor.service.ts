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

getAllProducts(): Observable<any>{
  return this.http.get(this.BASIC_URL + 'public/products', {
  })
}

getCategories(): Observable<any>{
  return this.http.get(this.BASIC_URL + "public/categories", {
  });
}


getAllProductsPagination(pageNumber: number):Observable<any>{
  return this.http.get(this.BASIC_URL + 'public/products/pagination?pageNumber=' + pageNumber, {
  });
}

getProductByCountry(id : number) : Observable<any>{
  return this.http.get(this.BASIC_URL + `public/countrie/${id}` , {
  })
}

getProductByCategory(id : number) : Observable<any>{
  return this.http.get(this.BASIC_URL + `public/categorie/${id}` , {
  })
}

sortProductsByPrice(pageNumber: number, ascending: boolean): Observable<any> {
  return this.http.get(`${this.BASIC_URL}public/products/sort?pageNumber=${pageNumber}&ascending=${ascending}`, {
  });
}

}
