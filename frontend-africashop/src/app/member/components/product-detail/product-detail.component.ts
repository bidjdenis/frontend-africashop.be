import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  product! : Product;
  id! : number;
  constructor(private memberService :MemberService, private activedRoute : ActivatedRoute){}

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

}
