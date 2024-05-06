import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../payload/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  public product : Product[] = []

  constructor(private memberService : MemberService, private snackbar : MatSnackBar, private router : Router){}

  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(){
    this.product = [];
    this.memberService.getWishListByUserId().subscribe(res => {
      this.product.push(...res);
      this.product.forEach((product : Product) => {
        product.processedImg = 'data:image/jpeg;base64,' + product.returnedImg;
        return product;
  })
    })
  }

  addProductToCart(productId : any){
    this.memberService.addTocart(productId).subscribe(res => {
      this.snackbar.open('Product added successfuly', 'close', {duration : 5000});
      this.router.navigateByUrl("/member/cart")
    })
  }


}
