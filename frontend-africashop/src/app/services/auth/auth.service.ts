import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASIC_URL = "http://localhost:8080/";
  AUTH_HEADER = 'authorization';

  constructor(private http: HttpClient, private storageService : StorageService) { }

  signup(data : any): Observable<any>{
    return this.http.post(this.BASIC_URL + 'sign-up', data);
  }

  
}