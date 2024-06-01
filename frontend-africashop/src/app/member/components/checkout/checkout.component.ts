import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Order } from '../../../payload/order';
import { CartItemsDto } from '../../../payload/cartItemsDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  max! : number;


  constructor(private memberService : MemberService,private fb : FormBuilder, 
    private router : Router, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ["", [Validators.required]],
    });
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


}
