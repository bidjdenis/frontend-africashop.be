import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Category } from '../../../payload/category';
import { Product } from '../../../payload/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCart } from '../../../payload/productCart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  pageNumber : number= 0;
  visible: boolean = false;
  public listeOfCategories : Category[] = [];
  public listeOfProducts : Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';


  constructor(private memberService : MemberService, private snackBar : MatSnackBar){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getProducts();
   
  }

  getAllCategories(){
    this.listeOfCategories = [];
    this.memberService.getCategories().subscribe(res => {
      this.listeOfCategories.push(...res);
    })
  }

  addProductToCart(productId : any){
    this.memberService.addTocart(productId).subscribe(res => {
      this.snackBar.open('Product added successfuly', 'close', {duration : 5000});
    })
  }

  getProducts(){
    this.listeOfProducts = [];
    this.memberService.getAllProductsPagination(this.pageNumber).subscribe(res => {
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
    this.visible = true;
    this.pageNumber = this.pageNumber - 1
    this.getProducts();
  }
  

  addToWishlist(id:any){
    this.memberService.addToWishList(id).subscribe(res =>{
      this.snackBar.open('Product added successfuly', 'close', {duration : 5000});      
    });
  
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
    this.memberService.sortProductsByPrice(ascending).subscribe(res => {
      res.forEach((product : Product) => product.processedImg="data:image/jpeg;base64, " + product.byteImg)
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
