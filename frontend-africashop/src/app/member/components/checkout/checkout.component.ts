import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Order } from '../../../payload/order';
import { CartItemsDto } from '../../../payload/cartItemsDto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  public cartItems: CartItemsDto[] = [];
  order! : Order;
  count! : number

  constructor(private memberService : MemberService){}

  ngOnInit(): void {
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


}
