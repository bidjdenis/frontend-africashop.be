import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  public product : Product[] = []

  constructor(private memberService : MemberService, private snackbar : MatSnackBar){}

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


}
