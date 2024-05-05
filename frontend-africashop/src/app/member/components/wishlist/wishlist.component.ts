import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  constructor(private memberService : MemberService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    
  }

}
