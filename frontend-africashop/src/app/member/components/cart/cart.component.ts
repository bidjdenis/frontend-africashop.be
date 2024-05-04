import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { CartItems } from '../../../payload/cartItems';
import { CartItemsDto } from '../../../payload/cartItemsDto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems : CartItemsDto[] = [];
  public quantity : number | undefined


  constructor(private memberService : MemberService){}

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

  calculateTotalAmount(): number {
    let total = 0;
    for(let c of this.cartItems){
      total += c.price * c.quantity;
    }
    return parseFloat(total.toFixed(2));;
  }

}
