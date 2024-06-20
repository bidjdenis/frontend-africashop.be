import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  public product : any[] = [];
  private readonly wishlistKey = 'wishlist';


  constructor(private visitorService : VisitorService, private router : Router, private snackBar : MatSnackBar){}

  ngOnInit(): void {
    this.getWishlist();
  }

  addCart(productId: number): void {
    this.visitorService.addToCart(productId);
    this.snackBar.open('Product added successfuly', 'close', {duration : 5000});
    this.router.navigateByUrl("visitor/cart");
  }

  getWishlist(){
    this.visitorService.getWishlistItemsWithDetails().subscribe(
      (productDetails: any[]) => {
        this.product = productDetails;
       this.product.forEach((element: { processedImg: string; img: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.img;
          return element;
    })
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails des produits:', error);
      }
    );
  }
  
  removeFromWishlist(productId: number): void {
    this.visitorService.removeFromWishlist(productId);
    this.product = this.visitorService.getWishlistItemsFromStorage(); 
    window.location.reload();
  }
  
}
