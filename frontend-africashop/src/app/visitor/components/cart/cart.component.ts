import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems: any[] = [];
  quantity: number = 0;
  private cartItemsKey = 'cartItems';

  constructor(private visitorService : VisitorService){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.visitorService.getCartItemsWithDetails().subscribe(
      (productDetails: any[]) => {
        this.cartItems = productDetails;
        this.quantity = this.cartItems.length;
       this.cartItems.forEach((element: { processedImg: string; img: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.img;
          return element;
    })
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails des produits:', error);
      }
    );
  }
  
  removeCartItem(productId: number): void {
    let cartItems = this.visitorService.getCartItemsFromStorage() || [];
    const index = cartItems.indexOf(productId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
      window.location.reload();
    }
  }
  

  calculateTotalAmount(): number {
    let total = 0;
    for (let c of this.cartItems) {
        total += c.price * c.quantity;
    }
    return total;
}

increaseQuantity(productId: any){
  // this.memberService.increaseProductQuantity(productId).subscribe(res =>{
  //   this.getCart();
  // })
}

decreaseQuantity(productId: any){
  // this.memberService.decreaseProductQuantity(productId).subscribe(res =>{
  //   this.getCart();
  // })
}

 
}
