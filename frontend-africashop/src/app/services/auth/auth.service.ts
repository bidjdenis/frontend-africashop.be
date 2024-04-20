import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable, map } from 'rxjs';
import { User } from '../../payload/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASIC_URL = "http://localhost:8080/";
  AUTH_HEADER = 'authorization';

  constructor(private http: HttpClient, private storageService : StorageService) { }

  signup(data : User): Observable<any>{
    return this.http.post(this.BASIC_URL + 'sign-up', data);
  }


  login(username : string, password : string): any{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = {username,password};
    return this.http.post(this.BASIC_URL + 'authenticate', body,{headers, observe: 'response'}).pipe(
      map((res:any) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if(token && user){
          this.storageService.saveToken(token);
          this.storageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }

  
}
