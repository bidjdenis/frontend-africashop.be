import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  BASIC_URL = "http://localhost:8080/";


  constructor(private http : HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get(this.BASIC_URL + "api/member/categories", {
      headers : this.createAuthorizationHeader()
    });
  }

  getAllProducts():Observable<any>{
    return this.http.get(this.BASIC_URL + 'api/member/products', {
      headers :this.createAuthorizationHeader()
    });
  }


  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
