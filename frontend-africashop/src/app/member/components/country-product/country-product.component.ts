import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-country-product',
  templateUrl: './country-product.component.html',
  styleUrl: './country-product.component.css'
})
export class CountryProductComponent implements OnInit{

  id! : number;
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';

  constructor(private memberService : MemberService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.getProductCountry();
  }

  getProductCountry(){
    this.products = [];
    this.memberService.getProductByCountry(this.id).subscribe( res => {
      res.forEach((product : Product) =>{ 
        product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
        this.products.push(product);
        this.applySearchFilter();
        })
       })
  }

  applySearchFilter(): void {
    if (this.searchKeyword.trim() !== '') {
      this.filteredProducts = this.products.filter((product: Product) =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase()),
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onSearchChange(): void {
    console.log(this.applySearchFilter()); 
  }

}
