import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../../payload/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public products : Product[] = [];
  public filteredProducts: Product[] = [];
  public searchKeyword: string = '';

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getAllProducts();

  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProduct().subscribe(res => {
      res.forEach((product : Product) =>  {
        product.processedImg ="data:image/jpeg; base64," + product.byteImg
        this.products.push(product)
        this.applySearchFilter(); 
      }
    )
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
