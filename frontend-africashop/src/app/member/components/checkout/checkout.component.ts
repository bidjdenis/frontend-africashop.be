import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Order } from '../../../payload/order';
import { CartItemsDto } from '../../../payload/cartItemsDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeService } from '../../../services/stripe/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  public cartItems: CartItemsDto[] = [];
  order! : Order;
  count! : number;
  couponForm! : FormGroup;
  chekoutForm! : FormGroup;
  max! : number;
  orderDetails: any;
  valid : boolean = false;


  constructor(private memberService : MemberService,private fb : FormBuilder, 
    private router : Router, private snackbar : MatSnackBar, private stripeService : StripeService){}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ["", [Validators.required]],
    });
    this.chekoutForm = this.fb.group({
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      boite: ["", [Validators.required]],
      codePostale: ["", [Validators.required]]
    })
    this.getCartOrder()
  }

  getCartOrder(){
    this.cartItems = [];
    this.memberService.getCartOrderByUserId().subscribe(res  =>{
      this.order = res;
      if (res && res.cartItems) {
        res.cartItems.forEach((cart : CartItemsDto) => {cart.processedImg = 'data:image/jpeg;base64, ' + cart.returnedImg;
      this.cartItems.push(cart)})
      this.count = this.cartItems.length
        
      }
    })
}

applyCoupon() {
  const couponCode = this.couponForm.get('code')!.value;

  this.memberService.applyCoupon(couponCode).subscribe(
    res => {
      if (res.totalAmount < this.max) {
        this.snackbar.open('Total amount is less than 20', 'close', { duration: 4000 });
      } else {
        this.snackbar.open('Coupon applied successfully', 'close', { duration: 4000 });
      }
      this.getCartOrder();
    },
    error => {
      this.snackbar.open('Total amount is less than 20', 'close', { duration: 4000 });
      console.error('Error applying coupon:', error);
    }
  );
}


checkout(){
  this.valid = true;
  if (this.chekoutForm.invalid) {
    this.snackbar.open('Please fill out all required fields', 'close', { duration: 4000 });
    this.valid = false;
    return;
  }
  this.memberService.checkout(this.chekoutForm.value).subscribe(res =>{
    if (res.id != null) {
      this.getOrderDetails();
      this.snackbar.open('informations saved', 'close', {duration : 4000})
    }else{
      console.log("error")
    }
  })
}

getOrderDetails() {
  this.memberService.getOrderDetails().subscribe(
    (orderDetails: any) => {
      console.log('Détails de la commande récupérés avec succès', orderDetails);
      this.orderDetails = orderDetails;
    },
   
  );
}

initiatePayment(): void {
  this.memberService.createCheckoutSession().subscribe(
    (session: any) => {
      if (session && session.id) {
        this.redirectToStripeCheckout(session.id);
      } else {
        console.error('Session ID not found');
      }
    },
    (error: any) => {
      console.error('Error creating checkout session:', error);
    }
  );
}

redirectToStripeCheckout(sessionId: string): void {
  const stripe = this.stripeService.getStripe();
  stripe.redirectToCheckout({ sessionId: sessionId }).then((result: any) => {
    if (result.error) {
      console.error('Error redirecting to Stripe checkout:', result.error);
    }
  });
}
}
