import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../../../payload/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  product! : Product;
  id! : number;
  constructor(private memberService :MemberService, private activedRoute : ActivatedRoute, 
    private snackbar : MatSnackBar, private router : Router){}

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.getProduct();
  }


  getProduct(){
    this.memberService.getProductById(this.id).subscribe(res =>{
      this.product = res.productDto;
      this.product.processedImg = 'data:image/jpeg;base64,' + res.productDto.byteImg;
    })
  }

  addToCart(id:number){
    this.memberService.addTocart(id).subscribe(res => {
    this.snackbar.open('Product added successfuly', 'close', {duration : 5000});
      this.router.navigateByUrl('/member/cart')
    })
  }

  addToWishlist(id:number){
    this.memberService.addToWishList(id).subscribe(res => {
    this.snackbar.open('Product added successfuly', 'close', {duration : 5000});
      this.router.navigateByUrl('/member/wishlist')
    })
  }

}
