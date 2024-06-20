import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  BASIC_URL = "http://localhost:8080/";
  private cartItemsKey = 'cartItems';
  private wishlistKey = 'wishList';

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

addToCart(productId: number): void {
  let cartItems = this.getCartItemsFromStorage() || [];
  cartItems.push(productId);
  localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
}

getCartItems(): number[] {
  const cartItemsString = localStorage.getItem('cartItems');
  return cartItemsString ? JSON.parse(cartItemsString) : [];
}

getCartItemsFromStorage(): number[] {
  const cartItemsString = localStorage.getItem(this.cartItemsKey);
  return cartItemsString ? JSON.parse(cartItemsString) : [];
}

getCartItemsWithDetails(): Observable<any[]> {
  const cartItemIds = this.getCartItems();
  const productDetailObservables: Observable<any>[] = [];

  for (const productId of cartItemIds) {
    const productDetailObservable = this.http.get<any>(this.BASIC_URL + `public/productDetail/${productId}`,);
    productDetailObservables.push(productDetailObservable);
  }

  return forkJoin(productDetailObservables);
}



}
