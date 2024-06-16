import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../../../payload/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  public products : Product[] = [];
  public reviews : any[] = [];
  product: any;
  id! : number
  reviewForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null
  submitted : boolean = false;
  
  constructor(private memberService :MemberService, private activedRoute : ActivatedRoute, 
    private snackbar : MatSnackBar, private router : Router, private fb: FormBuilder){}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: ["",[Validators.required]],
      description: ["",[Validators.required]],
    })
    this.id = this.activedRoute.snapshot.params['id'];
    this.getProduct();
    this.getReviews();
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  getProduct(){
    this.memberService.getProductById(this.id).subscribe(res =>{
      this.product = res.productDto;
      this.product.processedImg = 'data:image/jpeg;base64,' + res.productDto.byteImg;
    })
  }

  addToCart(id:number){
    this.memberService.addTocart(id).subscribe(res => {
    this.snackbar.open('Product added successfuly', 'close', {duration : 5000});
      this.router.navigateByUrl('/member/cart')
    })
  }

  addToWishlist(id:number){
    this.memberService.addToWishList(id).subscribe(res => {
    this.snackbar.open('Product added successfuly', 'close', {duration : 5000});
      this.router.navigateByUrl('/member/wishlist')
    })
  }

  get f (){return this.reviewForm.controls}

  submitForm(){
    this.submitted = true;
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile)
    formData.append('productId', this.id.toString());
    formData.append('userId', StorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.controls['rating'].value);
    formData.append('description', this.reviewForm.controls['description'].value);

    this.memberService.sendReview(formData).subscribe(res =>{
      this.snackbar.open("Review is added", "close", {duration : 4000})
      window.location.reload();      
    })
  }

  getReviews(){
    this.reviews = [];
    this.memberService.getAllReview(this.id).subscribe(res => {
     this.reviews = res;
     this.reviews.forEach((element: { processedImg: string; returnedImg: string; }) => {
       element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
       return element;
 })
    })
   }
 
}
