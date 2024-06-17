import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { Product } from '../../../payload/product';
import { Category } from '../../../payload/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  pageNumber : number= 0;
  visible: boolean = false;
  public listeOfCategories : Category[] = [];
  public listeOfProducts : Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';

  constructor(private visitorService : VisitorService){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getProducts();
  }

  getAllCategories(){
    this.listeOfCategories = [];
    this.visitorService.getCategories().subscribe(res => {
      this.listeOfCategories.push(...res);
    })
  }
  
  getProducts(){
    this.listeOfProducts = [];
    this.visitorService.getAllProductsPagination(this.pageNumber).subscribe(res => {
      res.forEach((product : Product) => {product.processedImg = "data:image/jpeg;base64," 
      + product.byteImg;
        this.listeOfProducts.push(product)
        this.applySearchFilter(); 
      }
      )
      
    })
  }

  public loadMoreProducts(){
    this.visible = true;
    this.pageNumber = this.pageNumber + 1
    this.getProducts();
  }

  public getBackProducts(){
    if (this.pageNumber > 0) {
      this.visible = true;
      this.pageNumber = this.pageNumber - 1;
      this.getProducts();
  }
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

  sortProductsByPrice(ascending: boolean): void {
    this.visitorService.sortProductsByPrice(this.pageNumber, ascending).subscribe(res => {
      res.forEach((product: Product) => product.processedImg = "data:image/jpeg;base64, " + product.byteImg);
      this.listeOfProducts = res;
      this.applySearchFilter(); 
    });
  }
  

  onSortChange(event: any): void {
    const sortOption = event.target.value;
    switch (sortOption) {
      case 'low-to-high':
        this.sortProductsByPrice(true);
        break;
      case 'high-to-low':
        this.sortProductsByPrice(false);
        break;
      default:
        this.getProducts();
        break;
    }
  }
  
  
  
  

 
  arrayOfImgUrls = [

    {
      image: 'assets/img/home.jpg',
    },
    {
      image: 'assets/img/home1.jpg',
    },
    {
      image: 'assets/img/home3.jpg',
    }
  ]

 

}
