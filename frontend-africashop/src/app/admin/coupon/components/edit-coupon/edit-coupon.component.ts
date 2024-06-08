import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coupon } from '../../../../payload/coupon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrl: './edit-coupon.component.css'
})
export class EditCouponComponent implements OnInit{

  @Input() coupon! : Coupon;

  couponForm! : FormGroup;
  submitted : boolean = false;


  constructor(private adminService : AdminService, private fb : FormBuilder,private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]]
    })

    this.setCoupon(this.coupon)

  }

  get f(){return this.couponForm.controls}

  updateCoupon():void{

    this.submitted = true;
    if(this.couponForm.valid){

      const formdata : FormData = new FormData();
      
      formdata.append('name', this.couponForm.get('name')?.value);
      formdata.append('code', this.couponForm.get('code')?.value);
      formdata.append('discount', this.couponForm.get('discount')?.value);
      formdata.append('description', this.couponForm.get('description')?.value);
      formdata.append('expirationDate', this.couponForm.get('expirationDate')?.value);

      this.adminService.updateCoupon(this.coupon.id,formdata ).subscribe(res => {
        window.location.reload();
      })
    }

  }

  setCoupon = (c : Coupon) =>{
    this.f.name.setValue(c.name);
    this.f.code.setValue(c.code);
    this.f.discount.setValue(c.discount);
    this.f.description.setValue(c.description);
    this.f.expirationDate.setValue(c.expirationDate)
  }


}
