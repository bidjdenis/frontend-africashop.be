import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../payload/category';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BASIC_URL = "http://localhost:8080/";

  constructor(private http : HttpClient) { }

  saveCategory(data : Category): Observable<any>{
    return this.http.post(this.BASIC_URL + 'api/admin/saveCategory', data, {
      headers : this.createAuthorizationHeader()
    });
  }


  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
