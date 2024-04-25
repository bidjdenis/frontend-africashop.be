import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../../payload/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  public products : Product[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.products = [];
    this.adminService.getAllProduct().subscribe(res=> {
      res.forEach((product: any) => {
        product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
        this.products.push(product);
      });
    });
}

}
