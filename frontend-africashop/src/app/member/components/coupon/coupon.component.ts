import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Coupon } from '../../../payload/coupon';
import { MemberService } from '../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent implements OnInit{

  public coupons : Coupon[] = []

  constructor(private memberService : MemberService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this.coupons = [];
    this.memberService.getAllCoupons().subscribe(res => {
      this.coupons.push(...res)
    })
  }

  @ViewChild('codeCell') codeCell!: ElementRef;
  
  copyText(text: string) {
    const codeElement = this.codeCell.nativeElement;
    const range = document.createRange();
    range.selectNodeContents(codeElement);
    const selection = window.getSelection();

    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            this.snackbar.open('Coupon copied', 'close',{duration : 4000})
        } catch (error) {
          this.snackbar.open('Error', 'close',{duration : 4000})
        } finally {
            selection.removeAllRanges();
        }
    } else {
      this.snackbar.open('Not selected', 'close',{duration : 4000})
    }
}


}
