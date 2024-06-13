import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})


export class StripeService {

  stripe: any;

  constructor(private http: HttpClient) {
    
    this.stripe = Stripe('pk_test_51N9YTaHc6KU9WzTt6HieGLzeRxp4NYE10CFAqlJbPYBxRX5PQfxr1iqD5SwIq0cJDZmDpR690qiwZXQVqHqk6LTz003pzzSqfo');  
  }

  getStripe() {
    return this.stripe;
  }
}
