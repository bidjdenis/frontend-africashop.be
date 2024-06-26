import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { CartItems } from '../../../payload/cartItems';
import { CartItemsDto } from '../../../payload/cartItemsDto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems : CartItemsDto[] = [];
  public quantity : number | undefined


  constructor(private memberService : MemberService, private router : Router, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = [];
    this.memberService.getCartItems().subscribe(res => {
      res.forEach((cart : CartItemsDto) => {cart.processedImg ="data:image/jpeg;base64, " + cart.returnedImg;
      this.cartItems.push(cart);
      this.quantity = this.cartItems.length;

      })
    })
  }

  increaseQuantity(productId: any){
    this.memberService.increaseProductQuantity(productId).subscribe(res =>{
      this.getCart();
    })
  }

  removeItem(productId: number) {
    this.memberService.removeCartItem(productId).subscribe(res => {
      this.getCart();
    });
  }

  decreaseQuantity(productId: any){
    this.memberService.decreaseProductQuantity(productId).subscribe(res =>{
      this.getCart();
    })
  }

  getValidation(){
    this.memberService.getOrderValidation().subscribe(res => {
      this.router.navigateByUrl('member/checkout')
      this.snackbar.open('cart items is validated', 'close', {duration : 4000})
    })
  }

  calculateTotalAmount(): number {
    let total = 0;
    for(let c of this.cartItems){
      total += c.price * c.quantity;
    }
    return parseFloat(total.toFixed(2));;
  }

}
