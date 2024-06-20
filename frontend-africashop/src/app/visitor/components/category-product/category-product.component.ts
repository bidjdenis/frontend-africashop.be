import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { Product } from '../../../payload/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.css'
})
export class CategoryProductComponent implements OnInit{
  
  public listeOfProducts : Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';
  public id! : number

  constructor(private visitorService : VisitorService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getProductByCategory();

  }

  getProductByCategory(){
    this.listeOfProducts = [];
    this.visitorService.getProductByCategory(this.id).subscribe( res => {
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
