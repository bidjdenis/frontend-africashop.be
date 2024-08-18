import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  BASIC_URL = "http://35.180.121.254:8081/";
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

getProductById(id : number): Observable<any>{
  return this.http.get(this.BASIC_URL + `public/product/${id}`, {
  });
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

addToWishlist(productId: number): void {
  let wishlist = this.getWishlistItemsFromStorage() || [];
  wishlist.push(productId);
  localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
}

getWishlistItems(): number[] {
  const wishlistItemsString = localStorage.getItem(this.wishlistKey);
  return wishlistItemsString ? JSON.parse(wishlistItemsString) : [];
}

 getWishlistItemsFromStorage(): number[] {
  const wishliItemsString = localStorage.getItem(this.wishlistKey);
  return wishliItemsString ? JSON.parse(wishliItemsString) : [];
}

removeFromWishlist(productId: number): void {
  let wishlist = this.getWishlistItemsFromStorage() || [];
  const index = wishlist.indexOf(productId);
  if (index !== -1) {
    wishlist.splice(index, 1);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }
}


getWishlistItemsWithDetails(): Observable<any[]> {
  const wishlistItemIds = this.getWishlistItems();
  const productDetailObservables: Observable<any>[] = [];

  for (const productId of wishlistItemIds) {
    const productDetailObservable = this.http.get<any>(this.BASIC_URL + `public/productDetail/${productId}`);
    productDetailObservables.push(productDetailObservable);
  }

  return forkJoin(productDetailObservables);
}

getAllReview(productId:any) : Observable<any>{
  return this.http.get(this.BASIC_URL + `public/review/${productId}` , {
  })
}

getAllCoupons(): Observable<any>{
  return this.http.get(this.BASIC_URL + `public/coupons`,{
  } )
}

getOrderByTrackingId(trackingId: number): Observable<any>{
  return this.http.get(this.BASIC_URL + `public/order/${trackingId}`);
}

getAllBlogs():Observable<any>{
  return this.http.get(this.BASIC_URL + `public/blogs`, {
  });
}

getBlogById(id : number): Observable<any>{
  return this.http.get(this.BASIC_URL + `public/blog/${id}`, {
  });
}

}
