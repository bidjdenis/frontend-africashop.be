import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.css'
})
export class AddCouponComponent implements OnInit{

  couponForm! : FormGroup;
  submitted : boolean = false;
  
  constructor(private adminService : AdminService, private fb : FormBuilder, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      description : ['', [Validators.required]],
      expirationDate: ['', [Validators.required]]
    })
  }

  get f(){return this.couponForm.controls}

  postCoupon() :void{

    this.submitted = true;

    if(this.couponForm.valid){
      this.adminService.createCoupon(this.couponForm.value).subscribe(res => {
        window.location.reload();
        this.snackbar.open('coupon create successfully', 'close', {duration: 5000})
      })

    }
  }

}
