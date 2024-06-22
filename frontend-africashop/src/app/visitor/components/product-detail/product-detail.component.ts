import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  id! : number


  constructor(private visitorService : VisitorService,private activedRoute : ActivatedRoute, 
    private snackbar : MatSnackBar, private router : Router){}


  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.getProduct();
  }

  getProduct(){
    this.visitorService.getProductById(this.id).subscribe(res =>{
      this.product = res.productDto;
      this.product.processedImg = 'data:image/jpeg;base64,' + res.productDto.byteImg;
    })
  }
}
