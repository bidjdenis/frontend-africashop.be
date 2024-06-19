import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-country-product',
  templateUrl: './country-product.component.html',
  styleUrl: './country-product.component.css'
})
export class CountryProductComponent implements OnInit{

  public listeOfProducts : Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';
  public id! : number

  constructor(private visitorService :VisitorService,private activatedRoute : ActivatedRoute, private router : Router){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getProductCountry();
  }

  getProductCountry(){
    this.listeOfProducts = [];
    this.visitorService.getProductByCountry(this.id).subscribe( res => {
      res.forEach((product : Product) => {product.processedImg = "data:image/jpeg;base64," 
      + product.byteImg;
        this.listeOfProducts.push(product)
        this.applySearchFilter(); 
      }
    )
    })
  }

  applySearchFilter(): void {
    if (this.searchKeyword.trim() !== '') {
      this.filteredProducts = this.listeOfProducts.filter((product: Product) =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase()),
      );
    } else {
      this.filteredProducts = this.listeOfProducts;
    }
  }

  onSearchChange(): void {
    console.log(this.applySearchFilter()); 
  }

}
