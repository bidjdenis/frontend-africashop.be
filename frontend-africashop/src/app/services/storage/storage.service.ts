import { Injectable } from '@angular/core';


const TOKEN = "ecom-token";
const USER = "ecom-user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  public saveToken(token : string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user : any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(){
    localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    const strUser = localStorage.getItem(USER);
    if(strUser !== null){
      return JSON.parse(strUser);
    }
    return null;
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user == null){
      return ''
    }
    return user.userId;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken === null){
      return false;
    }
    const role : string = this.getUserRole();
    return role == 'ADMIN'
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken === null){
      return false;
    }
    const role : string = this.getUserRole();
    return role == 'MEMBER'
  }

  static signOut(): void{
   window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
