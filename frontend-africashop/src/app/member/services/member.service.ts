import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs';
import { ProductCart } from '../../payload/productCart';

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

  getAllProductsPagination(pageNumber: number):Observable<any>{
    return this.http.get(this.BASIC_URL + 'api/member/products/pagination?pageNumber=' + pageNumber, {
      headers :this.createAuthorizationHeader()
    });
  }

  getProductByCountry(id : number) : Observable<any>{
    return this.http.get(this.BASIC_URL + `api/member/countrie/${id}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductByCategory(id : number) : Observable<any>{
    return this.http.get(this.BASIC_URL + `api/member/categorie/${id}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  addTocart(productId : any): Observable<any>{
    const data = {
      productId : productId,
      userId : StorageService.getUserId()
    }   
    return this.http.post(this.BASIC_URL + "api/member/addCart",data, {
      headers : this.createAuthorizationHeader()
    });
  }

  getCartItems():Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.BASIC_URL + `api/member/cart/${userId}`, {
      headers : this.createAuthorizationHeader()
    });
  }

  increaseProductQuantity(productId:any): Observable<any>{
    const cartDto = {
      productId : productId,
      userId: StorageService.getUserId()
    }
    return this.http.post(this.BASIC_URL + `api/member/addition`, cartDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  decreaseProductQuantity(productId:any): Observable<any>{
    const cartDto = {
      productId : productId,
      userId: StorageService.getUserId()
    }
    return this.http.post(this.BASIC_URL + `api/member/deduction`, cartDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  removeCartItem(productId : number): Observable<any> {
    return this.http.delete(this.BASIC_URL + `api/member/remove/${productId}`,{
      headers: this.createAuthorizationHeader(),
    });

  }

  addToWishList(productId:any): Observable<any>{
    const cartDto = {
      productId : productId,
      userId: StorageService.getUserId()
    }
    return this.http.post(this.BASIC_URL + `api/member/addWishlist`, cartDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getWishListByUserId(): Observable<any>{
    const userId = StorageService.getUserId()
    return this.http.get(this.BASIC_URL + `api/member/wishlist/${userId}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  removeWishlistItem(id: number): Observable<any> {
    return this.http.delete(this.BASIC_URL + `api/member/remove/wishlist/${id}`,{
      headers: this.createAuthorizationHeader(),
    });

  }

  getProductById(id : number): Observable<any>{
    return this.http.get(this.BASIC_URL + `api/member/product/${id}`, {
      headers : this.createAuthorizationHeader()
    });
  }
 
  sortProductsByPrice(pageNumber: number, ascending: boolean): Observable<any> {
    return this.http.get(`${this.BASIC_URL}api/member/products/sort?pageNumber=${pageNumber}&ascending=${ascending}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getOrderValidation():Observable<any>{
    const userId = StorageService.getUserId()
    return this.http.get(this.BASIC_URL + `api/member/order/${userId}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCartOrderByUserId():Observable<any>{
    const userId = StorageService.getUserId()
    return this.http.get(this.BASIC_URL + `api/member/cart/order/${userId}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code:any): Observable<any>{
    const userId = StorageService.getUserId()
    return this.http.get(this.BASIC_URL + `api/member/coupon/${userId}/${code}` , {
      headers: this.createAuthorizationHeader(),
    })
  }

  checkout(orderDto:any): Observable<any>{
    orderDto.userId = StorageService.getUserId()
    return this.http.post(this.BASIC_URL + `api/member/checkout`, orderDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderDetails() : Observable<any>{
    const userId = StorageService.getUserId()
    return this.http.get(this.BASIC_URL + `api/member/orderDetails/${userId}` , {
      headers: this.createAuthorizationHeader(),
    })
  }
  
  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
