import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../../payload/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  public products : Product[] = [];
  id! : number;

  constructor(private adminService : AdminService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.products = [];
    this.adminService.getAllProduct().subscribe(res=> {
      res.forEach((product: Product) => {
        product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
        this.products.push(product);
      });
    });
}

onDelete(id:number){
  if(confirm("Are you sure for suppression")){
    this.adminService.deleteProduct(id).subscribe(res => {
      window.location.reload();
      this.snackbar.open("Deletion successful", "close", {duration: 5000})
    })
  }
}


}
