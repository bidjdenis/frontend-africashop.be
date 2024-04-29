import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../payload/category';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs';
import { Country } from '../../payload/country';
import { Coupon } from '../../payload/coupon';

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

  getAllCategories():Observable<any>{
    return this.http.get(this.BASIC_URL + 'api/admin/category', {
      headers : this.createAuthorizationHeader()
    });
  }

  deleteCategory(id : number): Observable<any>{
    return this.http.delete(this.BASIC_URL + `api/admin/deleteCategory/${id}`, {
      headers : this.createAuthorizationHeader()
    });
  }

  updateCategory(data: any, id: number): Observable<any> {
    return this.http.put(this.BASIC_URL + `api/admin/category/update/${id}`, data, {
      headers : this.createAuthorizationHeader()
     });
  }


  createCountry(data:any):Observable<any>{
    return this.http.post(this.BASIC_URL +'api/admin/addCountry', data, {
      headers : this.createAuthorizationHeader()
    });
  }

  getAllCountries():Observable<any>{
    return this.http.get(this.BASIC_URL + 'api/admin/countries', {
      headers : this.createAuthorizationHeader()
    });
  }

  deleteCountry(id:number): Observable<any>{
    return this.http.delete(this.BASIC_URL +`api/admin/deleteCountry/${id}`, {
      headers : this.createAuthorizationHeader()
    });
  }

  updateCountry(id:any, data : any): Observable<any>{
    return this.http.put(this.BASIC_URL + `api/admin/country/update/${id}`, data, {
      headers : this.createAuthorizationHeader()
    });
  }

  createProduct(data:any):Observable<any>{
    return this.http.post(this.BASIC_URL + "api/admin/createProduct", data, {
      headers : this.createAuthorizationHeader()
    });
  }

  getAllProduct():Observable<any>{
    return this.http.get(this.BASIC_URL + "api/admin/products", {
      headers : this.createAuthorizationHeader()
    });
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(this.BASIC_URL + `api/admin/product/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductById(id:number):Observable<any>{
    return this.http.get(this.BASIC_URL + `api/admin/get/product/${id}`, {
      headers : this.createAuthorizationHeader()
    });
  }

  updateProduct(id:any, data: any):Observable<any>{
    return this.http.put(this.BASIC_URL + `api/admin/product/update/${id}`, data, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCoupons(): Observable<any>{
    return this.http.get(this.BASIC_URL + "api/admin/coupons", {
      headers : this.createAuthorizationHeader()
    });
  }

  createCoupon(data : Coupon): Observable<any>{
    return this.http.post(this.BASIC_URL + "api/admin/createCoupon", data,{
      headers : this.createAuthorizationHeader()
    })
  }

  deleteCoupon(id:number):Observable<any>{
    return this.http.delete(this.BASIC_URL + `api/admin/coupon/${id}`, {
      headers : this.createAuthorizationHeader()
  })
  }

  updateCoupon(id:number, data : any): Observable<any>{
    return this.http.put(this.BASIC_URL + `api/admin/coupon/update/${id}`, data, {
      headers : this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
